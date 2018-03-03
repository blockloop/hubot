# Description
# Generic hubot script boilerplate
#
# Commands:
#   hubot script (me) <thing>
#
# Configuration:
# HUBOT_TWSS_PROB (optional)
#   if twss.prob evaluates to a probability above this, it will
#   respond with 'twss'.  Defaults to 0.98
#
#
# Author:
#   blockloop
twss = require 'twss'
prob = process.env.HUBOT_TWSS_PROB or 0.98

module.exports = (robot) ->
  robot.hear /(.*)/i, (msg) ->
    string = msg.match[0];

    robot.logger.debug twss.prob string
    if ( twss.prob string ) >= prob
      msg.send("that's what she said")

