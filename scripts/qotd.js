// Description:
//   Get the WikiQuote of the day
//
// Dependencies:
//   request-promise-native
//   cheerio
//
// Commands:
//   hubot qotd
//   hubot quote of the day
//
// Author:
//   blockloop
const request = require("request-promise-native");
const cheerio = require("cheerio");

module.exports = function(robot) {
	const respond = (msg) => wikiQuote(robot, msg);
	robot.respond(/qotd/i, respond);
	robot.respond(/quote of the day/i, respond);
};

function wikiQuote(robot, msg) {
	getQuote(robot).
	then((quote) => msg.send(quote)).
	catch((err) => robot.emit("error", err));
}

function getQuote(robot) {
	return loadURLLive(robot, "https://en.wikiquote.org/wiki/Wikiquote:Quote_of_the_day").
	then(($) => $("table table").text().trim());
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

