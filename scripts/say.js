module.exports = function(robot) {
	robot.respond(/say (.+) in (.+)/i, (msg) => {
		const say = msg.match[1];
		const room = msg.match[2];

		const user = msg.envelope.user;
		if (!robot.auth.hasRole(user, "admin")) {
			robot.emit("error", new Error(`${user.name} tried to tell me to say "${say}" to "${room}"`));
			return false;
		}

		robot.logger.error(`was told to say ${say} to room ${room}. Envelope: ${msg.envelope}`);
		msg.reply(`Sending "${say}" to ${room}`);
		return robot.messageRoom(room, say);
	});
};
