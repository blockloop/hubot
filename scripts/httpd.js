// Description:
//   A simple interaction with the built in HTTP Daemon
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None
//
// URLS:
//   /hubot/version
//   /hubot/ping
//   /hubot/time
//   /hubot/info
//   /hubot/ip

const spawn = require("child_process").spawn;
const request = require("request-promise-native");

module.exports = function(robot) {
	robot.router.get("/hubot/version", (req, res) => {
		return res.end(robot.version);
	});
	robot.router.post("/hubot/ping", (req, res) => {
		return res.end("PONG");
	});
	robot.router.get("/hubot/time", (req, res) => {
		return res.end(`Server time is: ${new Date()}`);
	});
	robot.router.get("/hubot/info", (req, res) => {
		const child = spawn("/bin/sh", ["-c", "echo I\\'m $LOGNAME@$(hostname):$(pwd) \\($(git rev-parse HEAD)\\)"]);
		child.stdout.on("data", (data) => {
			res.end(`${data.toString().trim()} running node ${process.version} [pid: ${process.pid}]`);
			return child.stdin.end();
		});
	});
	robot.router.get("/hubot/ip", (req, res) => {
		request("http://icanhazip.com").
		then((body) => res.end(body)).
		catch((err) => {
			res.end(JSON.stringify(err));
			robot.emit("error", err);
		});
	});
};

