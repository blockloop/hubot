# Description:
#   Check the status of bamboo deploys created by Dynamic Deploy
#
# Dependencies:
#   auth
#
# Configuration:
#   None
#
# Commands:
#   github status
#
# Author:
#   Brett Jones

moment = require("moment")

module.exports = (robot) ->
  robot.respond /github status(.*)/i, (msg) ->
    msg.http("https://status.github.com/api/last-message.json")
      .get() (err, res, body) ->
        if err
          msg.send("Could not get status: " + err)
        else
          status = JSON.parse(body)
          pretty = moment(status.created_on).fromNow()
          msg.send(":octocat: says: #{status.body} (updated #{pretty})")
