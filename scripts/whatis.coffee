# Description:
#   Get system information from Hubot's home
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot what is your os [hostname,loadavg,uptime,freemem,totalmem,cpus,type,release,networkInterfaces,arch,platform,tmpDir]?
#   hubot what is your [name,version,deal]?
#
# Author:
#   Brett Jones
os = require('os')

module.exports = (robot) ->
  robot.respond /what (is|are) your (\w+)\??/i, (msg) ->
    query = msg.match[2].trim()

    return if checkCustom(query, msg)

    try result = os[query]()
    if result
      if typeof(result) is "object"
        result = JSON.stringify(result)
      msg.send "My #{query} #{msg.match[1]} #{result}"
      msg.finish()
      return

    else
      v = robot.brain.get(query)
      if v?
        msg.reply("My #{query} is #{v}")
        msg.finish()
      else
        msg.send("I don't know. You tell me. (#{robot.name} your [key] is [value])")
        msg.finish()


checkCustom = (q, msg) ->
  done = (resp) ->
    msg.reply(resp)
    msg.finish()
    return true

  if q == 'name'
    return done("My name is #{robot.name}")
  if q == 'deal' || q == 'problem'
    return done("@justin abused me")
  if q == 'version'
    v = process.env.HUBOT_VERSION or "unknown"
    return done("My version is #{v}")

  return false

