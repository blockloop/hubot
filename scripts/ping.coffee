# Description:
#   Utility commands surrounding Hubot uptime.
#
# Dependencies:
#   auth
#
# Commands:
#   hubot ping - Reply with pong
#   hubot echo <text> - Reply back with <text>
#   hubot time - Reply with current time
#   hubot die - End hubot process
#

module.exports = (robot) ->
  robot.respond /PING$/i, (msg) ->
    msg.send "PONG"

  robot.respond /ECHO (.*)$/i, (msg) ->
    msg.send msg.match[1]

  robot.respond /TIME$/i, (msg) ->
    msg.send "Server time is: #{new Date()}"

  robot.respond /DIE$/i, (msg) ->
    if not robot.auth.hasRole(msg.envelope.user, "dev")
      return msg.reply("Only devs can do that")
    msg.send "Goodbye, cruel world..."
    setTimeout ->
      process.exit 0
    , 1000

