// Description:
//   Inspect the data in redis easily
//
// Commands:
//   hubot show storage - Display the contents that are persisted in the brain
module.exports = function(robot) {
	robot.respond(/show storage$/i, (msg) => {
		const codeBlock = "```";
		const data = Object.assign({}, robot.brain.data);
		Reflect.deleteProperty(data, "users");

		const output = JSON.stringify(data, null, 4);
		msg.send(`${codeBlock}${output}${codeBlock}`);
	});


	robot.respond(/show user (.*)$/i, (msg) => {
		const query = msg.match[1];
		const users = robot.brain.data.users;
		const id = Object.keys(users).find((key) => {
			return users[key].name === query;
		});

		if (!id) {
			msg.send(`could not find ${query}`);
			return;
		}

		const codeBlock = "```";
		const output = JSON.stringify(users[id], null, 4);
		msg.send(`${codeBlock}${output}${codeBlock}`);
	});
};
