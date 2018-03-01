# Description:
#   Tells hubot something to remember
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot your [key] is [value]
#
# Author:
#   Brett Jones

unacceptable = [
  'name'
  'version'
]

module.exports = (robot) ->
  robot.respond /your (\S+) is (.+)/i, (msg) ->
    key = msg.match[1].trim()
    value = msg.match[2].trim()

    if key in unacceptable
      msg.reply("You can't tell me my #{key}")
      msg.finish()
      return

    msg.reply("I'll remember that. My #{key} is #{value}.")
    robot.brain.set(key, value)
    msg.finish()
    return
