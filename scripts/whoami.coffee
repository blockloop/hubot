# Description:
#   Find out everything hubot knows about you
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot whoami
#
# Author:
#   Brett Jones

module.exports = (robot) ->
  robot.respond /(whoami|who am i)/i, (msg) ->
    msg.reply("```\nJSON.stringify(msg.message.user, true)\n```")
