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
				throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
			}
			msg.finish();
		});
	});
	robot.respond(/tell me a chuck norris joke$/i, (msg) => {
		const run = robot.http("https://api.icndb.com/jokes/random")
			.header("User-Agent", "curl/7.54.0")
			.header("Accept", "application/json")
			.get();

		run((err, res, body) => {
			if (err) {
				throw new Error(`HTTP Error: ${err}`);
			}
			if (res.statusCode > 299) {
				throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
			}
			const resp = JSON.parse(body);
			if (resp.type === "success" && resp.value.joke) {
				msg.send(resp.value.joke);
				msg.finish();
				return;
			}
			msg.send(body);
			msg.finish();
		});
	});
};
