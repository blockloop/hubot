// Description:
//   Inspect the data in redis easily
//
// Commands:
//   hubot show storage - Display the contents that are persisted in the brain
const util = require("util");

module.exports = function(robot) {
	robot.respond(/show storage$/i, (msg) => {
		const block = "\n```\n";
		const output = util.inspect(robot.brain.data, false, 4);
		msg.send(`${block} ${output} ${block}`);
	});
};
