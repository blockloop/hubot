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

const contextKey = "cleverbot-context";
const cleverbot = require("cleverbot-free");
const verbCheck = require("verb-check");


module.exports = function(robot) {
	const atMeReText =`@?(${robot.alias}|${robot.name})`;
	const atMeRe = new RegExp(atMeReText, "ig");
	const toMeAtMeRe = new RegExp(`^${atMeReText} ((\\w+)(.*))`, "i");

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
				const origMsgText = msg.message.text || "";
				const atMe = atMeRe.test(origMsgText);

				if (!atMe) {
					return;
				}


				let msgText = "";
				let isAboutMe = (robot, sentence = "") => {
					if (!toMeAtMeRe.test(sentence)) {
						robot.logger.info(`${JSON.stringify(sentence)} is not about me`);
						return false;
					}
					const word = sentence.match(toMeAtMeRe)[3];
					const res = verbCheck.check(word);
					robot.logger.info(`verb check result for ${JSON.stringify(sentence)}: ${res}. Tested ${JSON.stringify(word)}`);
					return res;
				};

				if (isAboutMe(robot, origMsgText)) {
					// if the message is _about_ me then say 'cleverbot <verb>'
					// so that the AI will understand
					msgText = origMsgText.
						replace(atMeRe, "cleverbot").
						trim();
				} else {
					// the message is not about me, but it is _to_ me so instead of
					// saying "you what is your name" or "hubot what is your name"
					// we want to remove the first instance of my name and then replace
					// all other instances with "you"
					msgText = origMsgText.
						replace(toMeAtMeRe, "$2").
						replace(atMeRe, "you").
						trim();
				}
				robot.logger.info(`cleverbot replaced message ${JSON.stringify(origMsgText)} with ${JSON.stringify(msgText)}`);

				const username = msg.message.user == null
					? null
					: msg.message.user.name;

				let context = robot.brain.get(contextKey);
				if (!Array.isArray(context)) {
					context = [];
				}
				context = context.reverse().slice(0, 10).reverse();

				query(msgText, context)
					.then((response) => {
						response.replace("cleverbot", robot.name || robot.alias);
						msg.reply(response);
						context.push(msgText);
						context.push(response);
						robot.brain.set(contextKey, context);
						msg.finish();
					})
					.catch((err) => robot.emit("error", err));

			});
		}).
		catch((err) => robot.emit("error", err));
};
