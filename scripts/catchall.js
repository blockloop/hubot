// Description:
//   Catchall script. This will respond to anything that hubot scripts didn't understand.
//
// Dependencies:
//   "Sentimental": "1.0.1"
//
// Configuration:
//   CLEVERBOT_IO_API_USER
//   CLEVERBOT_IO_API_KEY
//
// Author:
//   blockloop

const apiuser = process.env.CLEVERBOT_IO_API_USER;
const apikey = process.env.CLEVERBOT_IO_API_KEY;
const Cleverbot = require("cleverbot.io");
const sentimental = require("Sentimental");
const analyze = sentimental.analyze;

module.exports = function(robot) {
	new Promise((resolve, reject) => {
		if (apiuser && apikey) {
			robot.logger.info(`Using cleverbot.io with API_USER: ${apiuser}`);
			resolve(new Cleverbot(apiuser, apikey));
		} else {
			reject("CLEVERBOT_IO_API_KEY and CLEVERBOT_IO_API_USER must be set to use cleverbot");
		}
	}).
		then((cbot) => {
			cbot.setNick("hubot");
			return cbot;
		}).
		then((cbot) => {
			return new Promise((resolve, reject) => {
				cbot.create((err, res) => {
					if (err) {
						reject(`cleverbot init: ${err}`);
					} else {
						resolve(cbot);
					}

				});
			});
		}).
		then((cbot) => {
			robot.logger.info("cleverboty ready");
			robot.catchAll((msg) => {
				catchAllHandler(robot, cbot, msg);
			});
		}).
		catch((err) => {
			robot.emit("error", err);
		});
};

function catchAllHandler(robot, cbot, msg) {
	const r = new RegExp(`@?(${robot.alias}|${robot.name})`, "ig");
	let msgText = msg.message.text || "";
	const atMe = r.test(msgText);
	if (atMe) {
		msgText = msgText.replace(r, "you").
			trim();
	}
	const username = msg.message.user == null
		? null
		: msg.message.user.name;

	store(robot, username, analyze(msgText));
	if (!atMe) {
		return;
	}
	cbot.ask(msgText, (err, res) => {
		if (err) {
			robot.emit("error", `cleverbot error: ${res}`);
		} else {
			msg.reply(res);
		}
		msg.finish();
	});
}

function store(robot, username, analysis) {
	const scores = robot.brain.get("hubot-sentimental");
	const data = JSON.parse(scores || "{}");
	if (!data[username] || !data[username].average) {
		data[username] = {
			score: 0,
			messages: 0,
			average: 0
		};
	}
	data[username].score += analysis.score;
	data[username].messages += 1;
	data[username].average = data[username].score / data[username].messages;
	robot.brain.set("hubot-sentimental", JSON.stringify(data));
	robot.logger.debug(`hubot-sentimental: ${username} now has ${data[username].score} / ${data[username].average}`);
}
