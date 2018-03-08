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
//   kyleslattery
//   awaxa
//
const apiKey = process.env.HUBOT_DARK_SKY_API_KEY || "";
const defaultLocation = process.env.HUBOT_DARK_SKY_DEFAULT_LOCATION || "Dallas";
const googleurl = "http://maps.googleapis.com/maps/api/geocode/json";
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
		catch((err) => robot.emit("error", err));
	});
};

/**
 * getLocation gets the longitude and lattitude for a given zipcode or city
 * @param {Object} msg
 * @param {String} location - zipcode or city name
 * @returns {Promise} - promise that resolves to {name: "Dallas", lat: <lattitude>, lng: <longitude>}
 */
function getLocation(msg, location) {
	const q = {
		sensor: false,
		address: location
	};
	return new Promise((resolve, reject) => {
		msg.http(googleurl).query(q).get()((err, res, body) => {
			if (err) {
				reject(err);
			} else if (res.statusCode > 299) {
				reject(new Error(`HTTP ${res.statusCode}: ${body || err}`));
			} else {
				resolve(body);
			}
		});
	}).
	then((body) => JSON.parse(body).results).
	then((res) => {
		if (!Array.isArray(res) || res.length < 1) {
			throw new Error(`Couldn't find ${location}`);
		}
		const locationName = res[0].formatted_address;
		const lat = res[0].geometry.location.lat;
		const lng = res[0].geometry.location.lng;
		return {
			name: locationName,
			lat: lat,
			lng: lng,
		};
	});
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
	const url = `https://api.darksky.net/forecast/${apiKey}/${loc.lat},${loc.lng}`;
	return new Promise((resolve, reject) => {
		msg.http(url).get()((err, res, body) => {
			if (err) {
				return reject(err);
			}
			if (res.statusCode > 299) {
				return reject(new Error(`HTTP ${res.statusCode}: ${body || err}`));
			}
			return resolve(body);
		});
	}).
	then((body) => JSON.parse(body)).
	then((result) => {
		if (result.error) {
			throw new Error(result.error);
		}
		return {
			weather: result,
			loc: loc,
		};
	});
}
