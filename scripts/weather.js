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
//   hubot forecast - Get the forecast for HUBOT_DARK_SKY_DEFAULT_LOCATION
//   hubot forecast <location> - Get the forecast for <location>
//
// Author:
//   blockloop
//
const request = require("request-promise-native");
const defaultLocation = process.env.HUBOT_DARK_SKY_DEFAULT_LOCATION || "Dallas";
const codeBlock = '```';

module.exports = function(robot) {
	robot.respond(/(weather|forecast) ?(.+)?/i, (msg) => {
		let days = msg.match[1] === "weather" ? 0 : 2;
		const location = msg.match[2] || defaultLocation;
		return request({
			uri: `http://wttr.in/${location}?${days}Tqn`,
			json: false,
			headers: {
				Accept: "*/*",
				"User-Agent": "curl/7.61.1"
			},
		}).
		then((weather) => msg.send(`${codeBlock}\n${weather}\n${codeBlock}`)).
		catch((err) => {
			robot.emit("error", err);
			msg.send(`Error trying to lookup weather: ${err}`);
		});
	});
};
