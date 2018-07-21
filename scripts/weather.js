// Description
//   Grabs the current forecast from Dark Sky
//
// Dependencies
//   None
//
// Configuration
//   HUBOT_DARK_SKY_API_KEY
//   HUBOT_DARK_SKY_DEFAULT_LOCATION
//
// Commands:
//   hubot weather - Get the weather for HUBOT_DARK_SKY_DEFAULT_LOCATION
//   hubot weather <location> - Get the weather for <location>
//
// Author:
//   blockloop
//
const request = require("request-promise-native");
const apiKey = process.env.HUBOT_DARK_SKY_API_KEY || "";
const defaultLocation = process.env.HUBOT_DARK_SKY_DEFAULT_LOCATION || "Dallas";
const googleurl = "https://maps.googleapis.com/maps/api/geocode/json";
const errNoAPIKey = new Error("HUBOT_DARK_SKY_API_KEY is not configured");


module.exports = function(robot) {
	robot.respond(/weather ?(.+)?/i, (msg) => {
		if (apiKey.length === 0) {
			robot.emit("error", new Error(errNoAPIKey));
			return;
		}

		const location = msg.match[1] || defaultLocation;
		getLocation(msg, location).
			then((loc) => getWeather(msg, loc)).
			then(({weather, loc}) => {
				const lines = [
					`In ${loc.name} it's currently ${Math.round(weather.currently.temperature)}°F and ${weather.currently.summary}`,
					`${weather.hourly.summary}`,
					`${weather.daily.summary}`
				];
				msg.send(lines.join("\n"));
			}).
			catch((err) => {
				robot.emit("error", err);
				msg.send(`Error trying to lookup weather: ${err}`);
			});
	});
};

/**
 * getLocation gets the longitude and lattitude for a given zipcode or city
 * @param {Object} msg
 * @param {String} location - zipcode or city name
 * @returns {Promise} - promise that resolves to {name: "Dallas", lat: <lattitude>, lng: <longitude>}
 */
function getLocation(msg, location) {
	return request({
		uri: googleurl,
		json: true,
		qs: {
			sensor: false,
			address: location
		},
	}).
		then((res) => res.results || []).
		then((res) => {
			if (res.length < 1) {
				return Promise.reject(new Error(`Couldn't find ${location}`));
			}
			return res[0];
		}).
		then((loc) => Promise.resolve({
			name: loc.formatted_address,
			lat: loc.geometry.location.lat,
			lng: loc.geometry.location.lng,
		}));
}

/**
 * getWeather gets the weather given the provided longitude and latitude
 * @param {Object} msg - hubot message
 * @param {Object} loc - the location to get weather for
 * @param {string} loc.name - the name of the location
 * @param {string} loc.lat - the lattitude
 * @param {string} loc.lng - the longitude
 * @returns {Promise} - promise that resolves to {Object} darksky response
 */
function getWeather(msg, loc) {
	return request({
		uri: `https://api.darksky.net/forecast/${apiKey}/${loc.lat},${loc.lng}`,
		json: true,
	}).
		then((result) => {
			if (result.error) {
				return Promise.reject(`darksky failed: ${result.error}`);
			}
			return {
				weather: result,
				loc: loc,
			};
		});
}
