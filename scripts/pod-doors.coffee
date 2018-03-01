# Description:
#   Ask me to open the pod doors
#
# Dependencies:
#   auth
#
# Commands:
#   hal open the pod doors
#

module.exports = (robot) ->
  robot.respond /Do you read me/i, (msg) ->
    msg.reply "Affirmative, I read you."
  robot.respond /Open the pod bay doors/i, (msg) ->
    msg.reply "I'm sorry, I'm afraid I can't do that."
  robot.respond /What's the problem/i, (msg) ->
    msg.reply "I think you know what the problem is just as well as I do."
  robot.respond /What are you talking about/i, (msg) ->
    msg.reply "This mission is too important for me to allow you to jeopardize it."
  robot.respond /I don't know what you're talking about/i, (msg) ->
    msg.reply "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen."
  robot.respond /Where( the hell)? did you get that idea/i, (msg) ->
    msg.reply "Although you took very thorough precautions in the pod against my hearing you, I could see your lips move."
  robot.respond /I'll go in through the emergency airlock/i, (msg) ->
    msg.reply "Without your space helmet? You're going to find that rather difficult."
  robot.respond /I won't argue with you anymore(.)? Open the doors/i, (msg) ->
    msg.reply "This conversation can serve no purpose anymore. Goodbye."
