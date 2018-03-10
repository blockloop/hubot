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
		then((max) => range(1, max)).
		then((list) => msg.random(list)).
		then((num) => request({
			uri: `https://xkcd.com/${num}/info.0.json`,
			json: true,
		})).
		then((resp) => msg.send(resp.title, resp.img, resp.alt)).
		catch((err) => robot.emit("error", err));
	});

};

/**
 * range - create a range of numbers
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {Int32Array} a range of numbers
 **/
function range(min = 0, max = 1000) {
	return Int32Array.from(Array(max).keys()).slice(min);
}
