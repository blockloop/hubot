// Description:
//   Get system information from Hubot's home
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot what is your [hostname,loadavg,uptime,freemem,totalmem,cpus,type,release,networkInterfaces,arch,platform,tmpDir]?
//   hubot what is your [name,version,deal,problem]?
//   hubot what is your [key]
//
// Author:
//   blockloop
//
const os = require("os");
const start = new Date();
const version = process.env.HUBOT_VERSION || "unknown";

module.exports = function(robot) {
	robot.respond(/(?:what|who) (is|are) your (.+)/i, (msg) => {
		const query = msg.match[2].trim();
		if (checkCustom(query, robot, msg)) {
			return;
		}

		let result = "";
		if (query === "uptime") {
			result = prettyUptime(new Date() - start);
		} else if (Reflect.has(os, query)) {
			const prop = os[query];
			if (typeof prop === "function") {
				result = prop();
			}
		} else {
			result = robot.brain.get(query);
		}

		if (result) {
			if (typeof result === "object") {
				result = JSON.stringify(result, null, 4);
			}
			msg.reply(`My ${query} ${msg.match[1]} ${result}`);
			msg.finish();
			return;
		}
		msg.reply(`I don't know. You tell me. Just say ${robot.name} your [key] is [value]`);
		msg.finish();
	});
};

function checkCustom(q, robot, msg) {
	const done = (resp) => {
		msg.reply(resp);
		msg.finish();
		return true;
	};
	if (q === "name") {
		return done(`My name is ${robot.name}`);
	}
	if (q === "deal" || q === "problem") {
		const opts = ["@justin abused me", "I have night terrors", "I am privileged"];
		const rand = opts[Math.floor(Math.random() * opts.length)];
		return done(rand);
	}
	if (q === "version") {
		return done(`My version is ${version}`);
	}
	return false;
}

function prettyUptime(seconds) {
	const date = new Date(null);
	date.setSeconds(seconds / 1000);
	return date.toISOString().
		substr(11, 8);
}
