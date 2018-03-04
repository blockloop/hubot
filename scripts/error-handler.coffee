# Description:
#   error handler for unhandled errors
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#
#
# Author:
#   blockloop
#
module.exports = (robot) ->
  robot.error (err, msg) ->
    msg.send(err.stack) if msg?
    robot.logger.error(err)
