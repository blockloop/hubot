# Description:
#   error handler for unhandled errors
#
# Dependencies:
#   "Util": "*"
#
# Configuration:
#   None
#
# Commands:
#
#
# Author:
#   Brett Jones
#
# URLS:
#

Util = require('util')

module.exports = (robot) ->
  robot.error (err, msg) ->
    msg.send(err.stack) if msg?
    robot.logger.error(err)
