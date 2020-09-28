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

	robot.respond(/show users/i, (msg) => {
		msg.send(JSON.stringify(robot.brain.data.users, undefined, 4));
	});

	robot.respond(/show user ([^ ]+)$/i, (msg) => {
		const query = msg.match[1].toLowerCase().
			trim();
		if (query.length < 3) {
			msg.send("query length must be > 2");
			return;
		}

		const found = Object.values(robot.brain.data.users).
			filter((user) => {
				return `${user.name || ""} ${user.email_address || ""} ${user.real_name || ""}`.
					trim().
					toLowerCase().
					includes(query);
			});

		found.forEach((user) => {
			const codeBlock = "```";
			const output = JSON.stringify(user, null, 4);
			msg.send(`${codeBlock}\n${output}\n${codeBlock}`);
		});

		msg.send(`Found ${found.length} users matching "${query}"`);
	});
};
