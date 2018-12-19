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
		return request({
			uri: `http://icanhazweather.com/${location}`,
			json: false
		}).
		then((weather) => msg.send(weather)).
		catch((err) => {
			robot.emit("error", err);
			msg.send(`Error trying to lookup weather: ${err}`);
		});
	});
};
