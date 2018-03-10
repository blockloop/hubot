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
const request = require("request-promise-native");

module.exports = function(robot) {
	robot.respond(/github status(.*)/i, (msg) => {
		request({
			uri: "https://status.github.com/api/last-message.json",
			json: true,
		}).
		then((res) => {
			const pretty = moment(res.created_on).fromNow();
			msg.send(`:github_octocat: : ${res.body} (updated ${pretty})`);
		}).
		catch((err) => robot.emit("error", err));
	});
};
