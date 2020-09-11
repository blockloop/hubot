// Description:
//   Catchall script. This will respond to anything that hubot scripts didn't understand.
//
// Dependencies:
//   "cleverbot-free": "1.0.4"

//
// Configuration:
//
// Author:
//   blockloop

const contextKey = 'cleverbot-context';
const apikey = process.env.CLEVERBOT_IO_API_KEY;
const cleverbot = require("cleverbot-free");

module.exports = function(robot) {
	new Promise((resolve, reject) => {
		resolve(cleverbot);
		// if (apikey) {
		// 	robot.logger.info(`Using cleverbot`);
		// 	resolve(cleverbot);
		// } else {
		// 	reject("CLEVERBOT_IO_API_KEY must be set to use cleverbot");
		// }
	}).
		then((query) => {
			robot.logger.info("cleverboty ready");
			robot.catchAll((msg) => {
				catchAllHandler(robot, query, msg);
			});
		}).
		catch((err) => robot.emit("error", err));
};

function catchAllHandler(robot, query, msg) {
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

	if (!atMe) {
		return;
	}

	let context = robot.brain.get(contextKey);
	if (!Array.isArray(context)) {
		context = [];
	}
	context = context.reverse().slice(0, 10).reverse()

	query(msgText, context).
	then((response) => {
		msg.reply(response);
		msg.finish();
	}).
	catch((err) => robot.emit('error', err));

	context.push(msgText)
	robot.brain.set('cleverbot-context', context)
}

