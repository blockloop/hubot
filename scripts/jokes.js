// Description:
//   Tell me some dad jokes
//
// Commands:
//   hubot tell me a (dad )joke - Reply with a joke
//

module.exports = function(robot) {
	robot.respond(/tell me a (dad )?joke$/i, (msg) => {
		new Promise((resolve) => {
			robot.http("https://icanhazdadjoke.com/").
			header("User-Agent", "curl/7.54.0").
			header("Accept", "*/*").
			get()((err, res, body) => {
				if (err) {
					throw new Error(`HTTP Error: ${err}`);
				}
				if (res.statusCode === 404) {
					return resolve("Comic not found.");
				}
				if (res.statusCode > 299) {
					throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
				}
				return resolve(body);
			});
		}).
		then((body) => msg.send(body)).
		catch((err) => robot.emit("error", err));
	});

	robot.respond(/tell me a chuck norris joke$/i, (msg) => {
		new Promise((resolve) => {
			robot.http("https://api.icndb.com/jokes/random").
			header("User-Agent", "curl/7.54.0").
			header("Accept", "application/json").
			get()((err, res, body) => {
				if (err) {
					throw new Error(`HTTP Error: ${err}`);
				}
				if (res.statusCode > 299) {
					throw new Error(`HTTP ${res.statusCode}: ${body || err}`);
				}
				return resolve(body);
			});
		}).
		then((body) => JSON.parse(body)).
		then((resp) => {
			if (resp.type === "success" && resp.value && resp.value.joke) {
				return resp.value.joke;
			}
			throw new Error(`unknown response from api: ${JSON.stringify(resp)}`);
		}).
		then((resp) => msg.send(resp)).
		catch((err) => robot.emit("error", err));
	});
};
