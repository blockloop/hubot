// Description:
//   tell me what happened this day in history
//
// Commands:
//   hubot (what happened )?this day in history
//   hubot tdih
//
const request = require("request-promise-native");
const cheerio = require("cheerio");

const uri = "https://www.history.com/this-day-in-history";
const brainKey = "tdih";

module.exports = function(robot) {
	const respond = (msg) => thisDayInHistory(robot, msg);
	robot.respond(/(what happened )?this day in history/i, respond);
	robot.respond(/tdih/i, respond);
};

function thisDayInHistory(robot, msg) {
	getThisDayInHistory(robot).
		then((item) => msg.send(item.title, item.link)).
		catch((err) => robot.emit("error", err));
}

function getThisDayInHistory(robot) {
	return getThisDayInHistoryCache(robot).
		catch(() => getThisDayInHistoryLive(robot)).
		then((liveData) => {
			robot.brain.set(brainKey, {
				date: Date.now(),
				data: liveData,
			});
			return liveData;
		});
}

function getThisDayInHistoryLive(robot) {
	return request({
		uri: uri,
		json: false,
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36",
			Accept: "text/html,application/xhtml+xml",
		},
	}).
		then((raw) => cheerio.load(raw)).
		then(($) => Object.assign({
			title: $("h2.title").
				text().
				trim(),
			body: $("article.article").
				text().
				trim().
				split("\n")[0],
			link: uri,
			year: $("strong.year").
				text().
				trim(),
		}));
}

function getThisDayInHistoryCache(robot) {
	return new Promise((resolve, reject) => {
		const cache = robot.brain.get(brainKey);
		const today = Date.now();
		if (cache && cache.date && cache.date.toDateString() === today.toDateString()) {
			robot.logger.info("ThisDayInHistory: cache hit");
			return resolve(cache.data);
		}
		robot.logger.info("ThisDayInHistory: cache miss");
		return reject("no data");
	});
}
