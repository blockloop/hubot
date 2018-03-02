// Description:
//   Find out everything hubot knows about you
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot (whoami|who am i)
//
// Author:
//   blockloop
const util = require("util");

module.exports = function(robot) {
	robot.respond(/(whoami|who am i)/i, (msg) => {
		const block = "\n```\n";
		msg.reply(`${block} ${util.inspect(msg.message.user, false, 4)} ${block}`);
	});
};
