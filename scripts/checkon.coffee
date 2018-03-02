# Description:
#   Calculate the average Sentimental / happiness score for each person based on their spoken words
#
# Dependencies:
#   "Sentimental": "1.0.1"
#
# Configuration:
#
# Commands:
#   hubot check on <username>
#   hubot check on everyone
#
# Notes:
#   You can use the "check on" commands to look up current averages for the different users.

sentimental = require('Sentimental')
analyze = sentimental.analyze
positivity = sentimental.positivity
negativity = sentimental.negativity

module.exports = (robot) ->
  robot.respond /check (on )?(.*)/i, (msg) ->
    username = msg.match[2]
    raw = robot.brain.get("hubot-sentimental")
    if raw
      scores = JSON.parse(raw)
      if username != "everyone" and (!scores[username] or scores[username].average == undefined)
        msg.send "#{username} has no happiness average yet"
      else
        for user, data of scores when (user == username or username == "everyone") and data.average != undefined
            msg.send "#{user} has a happiness average of #{data.average}"
    else
      msg.send "I haven't collected data on anybody yet"
      return
    return
