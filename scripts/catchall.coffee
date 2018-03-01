# Description:
#   Catchall script. This will respond to anything that hubot scripts didn't understand.
#   It is using Wolfram, which has a limitation of 2,000 api calls per month. The API
#   key is registered to dl-dev-team@onetechnologies.net.
#
# Dependencies:
#   "Sentimental": "0.0.4"
#
# Configuration:
#   HUBOT_WOLFRAM_APPID
#
# Commands:
#
#
# Author:
#   Brett Jones
#
# URLS:
#
#

appid = process.env.HUBOT_WOLFRAM_APPID
if appid?
  console.log("Using wolfram alpha with APPID: #{appid}")
else
  console.error("HUBOT_WOLFRAM_APPID is not set")
  return

Cleverbot = require("cleverbot-node")
cleverbot = new Cleverbot
cleverbot.configure({botapi: appid})

sentimental = require('Sentimental')
analyze = sentimental.analyze
positivity = sentimental.positivity
negativity = sentimental.negativity

module.exports = (robot) ->
  robot.catchAll (msg) ->
    r = new RegExp "^(#{robot.alias}|#{robot.name})(.*)", "i"
    atMe = msg.message.text?.match(r)?.length
    if atMe?
      try query = msg.message.text.match(r)[2].trim()
    else
      try query = msg.message.text.trim()

    username = msg.message?.user?.name

    return unless query?
    return unless username?

    analysis = analyze(query)

    store(robot, username, analysis)

    return unless atMe?
    console.log(JSON.stringify(cleverbot))
    cleverbot.write query, (res, err) ->
      if err?
        robot.emit 'error', err
      else if res.error?
        robot.emit 'error', res.error
      else
        msg.reply(res.output)
      msg.finish()


store = (robot, username, analysis) ->
  scores = robot.brain.get("hubot-sentimental")
  if scores
    sent = JSON.parse(scores)
  else
    sent = {}
  sent[username] = {score: 0, messages: 0, average: 0} if !sent[username] or !sent[username].average
  sent[username].score += analysis.score
  sent[username].messages += 1
  sent[username].average = sent[username].score / sent[username].messages
  robot.brain.set("hubot-sentimental", JSON.stringify(sent))
  robot.logger.debug "hubot-sentimental: #{username} now has #{sent[username].score} / #{sent[username].average}"
