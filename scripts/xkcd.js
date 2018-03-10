// Description:
//   Grab XKCD comic image urls
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot xkcd [latest]- The latest XKCD comic
//   hubot xkcd <num> - XKCD comic <num>
//   hubot xkcd random - XKCD comic <num>
//
// Author:
//   blockloop
const request = require("request-promise-native");

module.exports = function(robot) {
	robot.respond(/xkcd(\s+latest)?$/i, (msg) => {
		request({
			uri: "https://xkcd.com/info.0.json",
			json: true,
		}).
		then((resp) => msg.send(resp.title, resp.img, resp.alt)).
		catch((err) => robot.emit("error", err));
	});

	robot.respond(/xkcd\s+(\d+)/i, (msg) => {
		request({
			uri: `https://xkcd.com/${msg.match[1]}/info.0.json`,
			json: true,
		}).
		then((resp) => msg.send(resp.title, resp.img, resp.alt)).
		catch((err) => robot.emit("error", err));
	});

	robot.respond(/xkcd\s+random/i, (msg) => {
		request({
			uri: "https://xkcd.com/info.0.json",
			json: true,
		}).
		catch(() => Promise.resolve(1500)).
		then((resp) => resp.num).
		then((max) => randomInt(1, max)).
		then((num) => request({
			uri: `https://xkcd.com/${num}/info.0.json`,
			json: true,
		})).
		then((resp) => msg.send(resp.title, resp.img, resp.alt)).
		catch((err) => robot.emit("error", err));
	});
};

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 **/
function randomInt(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
