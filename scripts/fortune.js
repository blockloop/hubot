// Description:
//   Get a random fortune https://en.wikipedia.org/wiki/Fortune_(Unix)
//
// Dependencies:
//   request-promise-native
//   random-fortune
//
// Commands:
//   hubot fortune
//   hubot random fortune
//   hubot tell me a fortune
//   hubot tell me a random fortune
//
// Author:
//   blockloop
const fortune = require("random-fortune");

module.exports = (robot) => {
	robot.respond(/(tell me a )?(random )?fortune/i, (msg) => {
		msg.send(fortune.fortune());
	});
};
