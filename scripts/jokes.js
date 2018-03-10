// Description:
//   Tell me some dad jokes
//
// Commands:
//   hubot tell me a (dad )joke - Reply with a joke
//
const request = require("request-promise-native");

module.exports = function(robot) {
	robot.respond(/tell me a (dad )?joke$/i, (msg) => {
		request({
			uri: "https://icanhazdadjoke.com/",
			json: true,
			headers: {
				"User-Agent": "curl/7.54.0",
				Accept: "*/*",
			},
		}).
		then((resp) => msg.send(resp)).
		catch((err) => robot.emit("error", err));
	});

	robot.respond(/tell me a chuck norris joke$/i, (msg) => {
		request({
			uri: "https://api.icndb.com/jokes/random",
			json: true,
			headers: {
				"User-Agent": "curl/7.54.0",
				Accept: "application/json",
			},
		}).
		then((resp) => {
			if (resp.type === "success" && resp.value && resp.value.joke) {
				return resp.value.joke;
			}
			return Promise.reject(JSON.stringify(resp));
		}).
		then((resp) => msg.send(resp)).
		catch((err) => robot.emit("error", err));
	});
};
