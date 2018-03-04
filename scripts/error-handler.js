// Description:
//   error handler for unhandled errors
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//
// Author:
//   blockloop
//
module.exports = function(robot) {
	robot.error((err, msg) => {
		if (msg) {
			msg.send(err.stack);
		}
		robot.logger.error(err);
	});
};
