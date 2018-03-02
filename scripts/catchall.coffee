# Description:
#   Catchall script. This will respond to anything that hubot scripts didn't understand.
#   It is using Wolfram, which has a limitation of 2,000 api calls per month. The API
#   key is registered to dl-dev-team@onetechnologies.net.
#
# Dependencies:
#   "Sentimental": "0.0.4"
#
# Configuration:
#   CLEVERBOT_IO_API_USER
#   CLEVERBOT_IO_API_KEY
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

apiuser = process.env.CLEVERBOT_IO_API_USER
apikey = process.env.CLEVERBOT_IO_API_KEY
if apiuser? and apikey?
  console.log("Using cleverbot.io with API_USER: #{apiuser}")
else
  console.error("CLEVERBOT_IO_API_KEY and CLEVERBOT_IO_API_USER must be set to use cleverbot")
  return

cleverbotready = false

cleverbot = require('cleverbot.io')
bot = new cleverbot(apiuser, apikey);
bot.setNick("hubot")
bot.create (err, res) ->
  if err
    console.error "cleverbot init error: #{res}"
  else
    cleverbotready = true

sentimental = require('Sentimental')
analyze = sentimental.analyze
positivity = sentimental.positivity
negativity = sentimental.negativity

module.exports = (robot) ->
  robot.catchAll (msg) ->
    r = new RegExp("@?(#{robot.alias}|#{robot.name})", "ig")
    atMe = msg.message.text?.match(r)?.length
    if atMe?
      try query = msg.message.text.replace(r, "you").trim()
    else
      try query = msg.message.text.trim()

    username = msg.message?.user?.name

    return unless query?
    return unless username?

    analysis = analyze(query)

    store(robot, username, analysis)

    return unless cleverbotready
    return unless atMe?
    bot.ask query, (err, res) ->
      if err
        robot.emit 'error', "cleverbot error: #{res}"
      else
        msg.reply(res)
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
