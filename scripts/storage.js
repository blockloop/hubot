// Description:
//   Inspect the data in redis easily
//
// Commands:
//   hubot show storage - Display the contents that are persisted in the brain
//   hubot show user <user> - Display the contents that are persisted in the brain
//
const codeBlock = "```";

module.exports = function(robot) {
	robot.respond(/show (storage|brain)$/i, (res) => {
		const data = Object.assign({}, robot.brain.data);
		Reflect.deleteProperty(data, "users");

		const output = JSON.stringify(data, null, 4);
		res.send(`${codeBlock}${output}${codeBlock}`);
	});

	robot.respond(/show users/i, (res) => {
		Object.values(robot.brain.data.users).
			filter((user) => !(user.slack && user.slack.deleted)).
			forEach((user) => {
				const output = JSON.stringify(user, undefined, 4);
				res.send(`${codeBlock}${output}${codeBlock}`);
			});
	});

	robot.respond(/show user ([^ ]+)$/i, (res) => {
		const query = res.match[1].toLowerCase().
			trim();
		if (query.length < 3) {
			res.reply("query length must be > 2");
			return;
		}

		const found = Object.values(robot.brain.data.users).
			filter((user) => !(user.slack && user.slack.deleted)).
			filter((user) => {
				return `${user.name || ""} ${user.email_address || ""} ${user.real_name || ""}`.
					trim().
					toLowerCase().
					includes(query);
			});

		found.forEach((user) => {
			const codeBlock = "```";
			const output = JSON.stringify(user, null, 4);
			res.send(`${codeBlock}\n${output}\n${codeBlock}`);
		});

		res.send(`Found ${found.length} users matching "${query}"`);
	});
};
