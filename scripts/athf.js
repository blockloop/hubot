// Description:
//   Get an Aqua Teen Hunger Force quote
//
// Commands:
//   hubot athf quote
//   hubot aqua teen hunger force quote
//   hubot quote athf
//   hubot quote aqua teen hunger force
//
const request = require("request-promise-native");
const cheerio = require("cheerio");
const urls = [1, 2, 3, 4, 5, 6, 7].map((n) => `https://en.wikiquote.org/wiki/Aqua_Teen_Hunger_Force_(Season_${n})`);

module.exports = function(robot) {
	const respond = (msg) => athfQuote(robot, msg);
	robot.respond(/aqua teen hunger force(?: quote)/i, respond);
	robot.respond(/athf(?: quote)/i, respond);
	robot.respond(/quote aqua teen hunger force/i, respond);
	robot.respond(/quote athf/i, respond);
};

function athfQuote(robot, msg) {
	getQuote(robot).
	then((quote) => msg.send(quote)).
	catch((err) => robot.emit("error", err));
}

function getQuote(robot) {
	const url = random(urls);
	return loadURLCache(robot, url).
	catch(() => {
		return loadURLLive(robot, url).
		then((data) => {
			robot.brain.set(`athf.${url}`, data);
			return data;
		});
	}).
	then(($) => {
		const r = random($("#mw-content-text dl"));
		return $(r).text();
	});
}

function loadURLCache(robot, url) {
	const data = robot.brain.get(`athf.${url}`);
	if (data) {
		robot.logger.info(`cache hit ${url}`);
		return Promise.resolve(data);
	}
	return Promise.reject(new Error("no cache"));
}

function loadURLLive(robot, url) {
	return request({
		uri: url,
		json: false,
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36",
			Accept: "text/html,application/xhtml+xml",
		},
	}).
	then((raw) => cheerio.load(raw));
}

/**
 * randomly choose an item from the array
 * @param {Array} a items An array containing the items.
 * @return {Object} random item from the array
 */
function random(a) {
	return shuffle(a)[0];
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * @return {Array} array shuffled
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
