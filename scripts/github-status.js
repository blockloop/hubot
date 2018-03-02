// Description:
//   Check the status of bamboo deploys created by Dynamic Deploy
//
// Dependencies:
//   auth
//
// Configuration:
//   None
//
// Commands:
//   github status
//
// Author:
//   Brett Jones
const moment = require("moment");

module.exports = function(robot) {
	robot.respond(/github status(.*)/i, (msg) => {
		msg.http("https://status.github.com/api/last-message.json").get()((err, res, body) => {
			if (err) {
				robot.emit("error", new Error(err));
				msg.send(`ERROR: ${err}`);
				return;
			}
			const status = JSON.parse(body);
			const pretty = moment(status.created_on).fromNow();
			msg.send(`:github_octocat: : ${status.body} (updated ${pretty})`);
		});
	});
};
