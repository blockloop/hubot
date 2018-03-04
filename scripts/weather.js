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
			throw new Error(errNoAPIKey);
		}

		const location = msg.match[1] || defaultLocation;
		const q = {
			sensor: false,
			address: location
		};
		msg.http(googleurl).query(q).get()((err, res, body) => {
			if (err) {
				throw new Error(`HTTP Error: ${err}`);
			}
			if (res.statusCode > 299) {
				throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
			}

			const results = JSON.parse(body).results;
			if (!results || results.length < 1) {
				msg.send(`Couldn't find ${location}`);
				return;
			}
			const lat = results[0].geometry.location.lat;
			const lng = results[0].geometry.location.lng;
			const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
			msg.http(url).get()((err, res, body) => {
				if (err) {
					throw new Error(`HTTP Error: ${err}`);
				}
				if (res.statusCode > 299) {
					throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
				}

				const result = JSON.parse(body);
				if (result.error) {
					throw new Error(result.error);
				}
				const lines = [
					`Currently ${result.currently.summary} ${Math.round(result.currently.temperature)}°F`,
					`${result.hourly.summary}`,
					`${result.daily.summary}`
				];
				msg.send(lines.join("\n"));
			});
		});
	});
};
