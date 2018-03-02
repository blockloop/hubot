// Description:
//   Grab XKCD comic image urls
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot xkcd [latest]- The latest XKCD comic
//   hubot xkcd <num> - XKCD comic <num>
//   hubot xkcd random - XKCD comic <num>
//
// Author:
//   blockloop
module.exports = function(robot) {
	robot.respond(/xkcd(\s+latest)?$/i, (msg) => {
		robot.http("https://xkcd.com/info.0.json").get()((err, res, body) => {
			if (err) {
				robot.emit("error", `Error from HTTP: ${err}`);
			} else if (res.statusCode === 404) {
				msg.send("Comic not found.");
			} else if (body) {
				const object = JSON.parse(body);
				msg.send(object.title, object.img, object.alt);
			} else {
				robot.emit("error", `bad status code from http: (${res.statusCode})`);
			}
			msg.finish();
		});
	});

	robot.respond(/xkcd\s+(\d+)/i, (msg) => {
		const num = `${msg.match[1]}`;
		robot.http(`https://xkcd.com/${num}/info.0.json`).get()((err, res, body) => {
			if (err) {
				robot.emit("error", `Error from HTTP: ${err}`);
			} else if (res.statusCode === 404) {
				msg.send(`Comic ${num} not found.`);
			} else {
				const object = JSON.parse(body);
				msg.send(object.title, object.img, object.alt);
			}
		});
	});

	robot.respond(/xkcd\s+random/i, (msg) => {
		robot.http("https://xkcd.com/info.0.json").get()((err, res, body) => {
			let max, num;
			if (err != null) {
				robot.emit("error", `Error from HTTP: ${err}`);
			} else if (res.statusCode === 404) {
				max = 0;
			} else {
				max = JSON.parse(body).num;
				num = Math.floor((Math.random() * max) + 1);
			}
			robot.http(`https://xkcd.com/${num}/info.0.json`).get()((err, res, body) => {
				if (err) {
					robot.emit("error", `Error from HTTP: ${err}`);
				} else {
					const object = JSON.parse(body);
					msg.send(object.title, object.img, object.alt);
				}
			});
		});
	});
};
