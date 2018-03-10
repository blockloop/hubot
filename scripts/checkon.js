// Description:
//   Calculate the average Sentimental / happiness score for each person based on their spoken words
//
// Dependencies:
//   "Sentimental": "1.0.1"
//
// Configuration:
//
// Commands:
//   hubot check on <username>
//   hubot check on everyone
//
// Notes:
//   You can use the "check on" commands to look up current averages for the different users.

// Generated by CoffeeScript 1.6.3
(function() {
  var analyze, negativity, positivity, sentimental;

  sentimental = require('Sentimental');

  analyze = sentimental.analyze;

  positivity = sentimental.positivity;

  negativity = sentimental.negativity;

  module.exports = function(robot) {
    return robot.respond(/check (on )?(.*)/i, function(msg) {
      var data, raw, scores, user, username;
      username = msg.match[2];
      raw = robot.brain.get("hubot-sentimental");
      if (raw) {
        scores = JSON.parse(raw);
        if (username !== "everyone" && (!scores[username] || scores[username].average === void 0)) {
          msg.send("" + username + " has no happiness average yet");
        } else {
          for (user in scores) {
            data = scores[user];
            if ((user === username || username === "everyone") && data.average !== void 0) {
              msg.send("" + user + " has a happiness average of " + data.average);
            }
          }
        }
      } else {
        msg.send("I haven't collected data on anybody yet");
        return;
      }
    });
  };

}).call(this);