// Description:
//   Get a random deep thought by Jack Handy
//
// Dependencies:
//   fs
//
// Commands:
//   hubot deep thought
//   hubot tell me a deep thought
//
// Author:
//   blockloop

const fs = require("fs");
const sourceFile = process.env.DEEP_THOUGHTS_FILE || "";
const codeBlock = "```";

module.exports = (robot) => {
	responder(robot)
		.then((respond) => robot.respond(/(tell me a )?(random )?deep thought/i, respond))
		.catch((err) => robot.emit("error", err));
};

function read() {
	return new Promise((resolve, reject) => {
		fs.readFile(sourceFile, "utf8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function responder(robot) {
	return read()
		.then((data) => {
			robot.logger.info(`using file ${sourceFile}...`);
			return (msg) => {
				msg.send(
					[
						codeBlock,
						msg.random(data.split("\n")),
						codeBlock,
					].join("\n")
				);
			};
		})
		.catch((err) => {
			const m = `file is unreadable. Deep thoughts disabled. ${err.message}`;
			robot.logger.info(m);
			robot.emit("error", new Error(m));
			return (msg) => msg.send(m);
		});
}
