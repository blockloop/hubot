// Description:
//   Inspect the data in redis easily
//
// Commands:
//   hubot show storage - Display the contents that are persisted in the brain
const util = require("util");

module.exports = function(robot) {
	robot.respond(/show storage$/i, (msg) => {
		const codeBlock = "```";
		const data = Object.assign({}, robot.brain.data);
		Reflect.deleteProperty(data, "users");

		const output = util.inspect(data, false, 4);
		msg.send(`${codeBlock}${output}${codeBlock}`);
	});
};
