// Description:
//   Utility commands surrounding Hubot uptime.
//
// Dependencies:
//   auth
//
// URLS:
//   /ping
//
// Commands:
//   hubot ping - Reply with pong
//   hubot echo <text> - Reply back with <text>
//   hubot time - Reply with current time
//   hubot die - End hubot process
//
module.exports = function(robot) {
	robot.respond(/PING$/i, (msg) => {
		return msg.send("PONG");
	});
	robot.respond(/ECHO (.*)$/i, (msg) => {
		return msg.send(msg.match[1]);
	});
	robot.respond(/TIME$/i, (msg) => {
		return msg.send(`Server time is: ${new Date()}`);
	});
	robot.respond(/DIE$/i, (msg) => {
		if (!robot.auth.hasRole(msg.envelope.user, "dev")) {
			return msg.reply("Only devs can do that");
		}
		msg.send("Goodbye, cruel world...");
		return setTimeout(() => {
			return process.exit(1);
		}, 1000);
	});
};
