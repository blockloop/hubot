// Description:
//   Inspect the data in redis easily
//
// Commands:
//   hubot show storage - Display the contents that are persisted in the brain
//   hubot show user <user> - Display the contents that are persisted in the brain
module.exports = function(robot) {
	robot.respond(/show storage$/i, (msg) => {
		const codeBlock = "```";
		const data = Object.assign({}, robot.brain.data);
		Reflect.deleteProperty(data, "users");

		const output = JSON.stringify(data, null, 4);
		msg.send(`${codeBlock}${output}${codeBlock}`);
	});


	robot.respond(/show user ([^ ]+)$/i, (msg) => {
		const query = msg.match[1].toLowerCase().trim();
		if (query.length < 3) {
			msg.send(`query length must be > 2`)
			return;
		}

		const users = robot.brain.data.users || [];
		const found = Object.values(users).filter((user) => {
			return `${user.name || ""} ${user.email_address || ""} ${user.real_name || ""}`
				.trim()
				.toLowerCase()
				.includes(query);
		}) || [];

		if (found.length === 0) {
			msg.send(`could not find ${query}`);
			return;
		}

		const codeBlock = "```";
		const output = JSON.stringify(found, null, 4);
		msg.send(`${codeBlock}${output}${codeBlock}`);
	});
};
