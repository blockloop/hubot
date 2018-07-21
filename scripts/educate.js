// Description:
//   Tells hubot something to remember
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot your [key] is [value]
//
// Author:
//   Brett Jones

const unacceptable = Object.keys(require("os")).
	concat(["name", "version", "deal", "problem"]);

module.exports = function(robot) {
	robot.respond(/your (.+) is (.+)/i, (msg) => {
		const key = msg.match[1].trim();
		const value = msg.match[2].trim();
		if (unacceptable.includes(key)) {
			msg.reply(`You can't tell me my ${key}`);
			msg.finish();
			return;
		}
		msg.reply(`I'll remember that. My ${key} is ${value}.`);
		robot.brain.set(key, value);
		msg.finish();
	});
};
