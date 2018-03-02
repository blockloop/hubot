// Description:
//   Tell me some dad jokes
//
// Commands:
//   hubot tell me a (dad )joke - Reply with a joke
//
module.exports = function(robot) {
	robot.respond(/tell me a (dad )?joke$/i, (msg) => {
		const run = robot.http("https://icanhazdadjoke.com/")
			.header("User-Agent", "curl/7.54.0")
			.header("Accept", "*/*")
			.get();

		run((err, res, body) => {
			if (err) {
				robot.emit("error", `HTTP Error: ${err}`);
				msg.send(`error: ${err}`);
			} else if (res.statusCode === 404) {
				msg.send("Comic not found.");
			} else if (body) {
				msg.send(body);
			} else {
				robot.emit("error", `bad status code from http: (${res.statusCode})`);
			}
			msg.finish();
		});
	});
};
