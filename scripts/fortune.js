// Description:
//   Get a random fortune https://en.wikipedia.org/wiki/Fortune_(Unix)
//
// Dependencies:
//   fs
//
// Commands:
//   hubot fortune
//   hubot random fortune
//   hubot tell me a fortune
//   hubot tell me a random fortune
//
// Author:
//   blockloop

const fs = require("fs");
const fortunesFile = process.env.FORTUNES_FILE || "";

module.exports = (robot) => {
	responder(robot)
		.then((respond) => robot.respond(/(tell me a )?(random )?fortune/i, respond))
		.catch((err) => robot.emit("error", err));
};

function readFortunes() {
	return new Promise((resolve, reject) => {
		fs.readFile(fortunesFile, "utf8", (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

function responder(robot) {
	return readFortunes()
		.then((data) => {
			robot.logger.info(`using fortunes file ${fortunesFile}...`);
			return (msg) => msg.send(msg.random(data.split("%\n")));
		})
		.catch((err) => {
			const m = `fortunes file is unreadable. Fortunes disabled. ${err.message}`;
			robot.logger.info(m);
			robot.emit("error", new Error(m));
			return (msg) => msg.send(m);
		});
}
