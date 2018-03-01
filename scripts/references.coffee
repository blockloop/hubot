# Description:
#   My first script
#
# Notes:
#   First script
#   Comand to launch Hubot:  FILE_BRAIN_PATH=brain.json bin/hubot
#   Setup hubot on windows:  
#   Install Python 3.2:  https://www.python.org/download/releases/3.2/
#   Install LMXL :        https://pypi.python.org/pypi/lxml/3.4.2

module.exports = (robot) ->

  run = (msg) ->
    msg.send "Calculating..."

    project = msg.match[1]
    dll = msg.match[2]

    Fs = require('fs')
    Path = require('path')
    exec = require('child_process').exec

    #msg.send "variables project=#{project} and dll=#{dll}"
    cmd = ".\\commands\\utils\\references.cmd #{project} #{dll}"
    #msg.send(cmd)

    #exec "dir", (error, stdout, stderr) ->
    #  msg.send "ERROR: #{stderr}"
    #  msg.send "STDOUT: #{stdout}"
    #  msg.send "STDERR: #{stderr}"

    exec cmd, (error, stdout, stderr) ->
      msg.send "ERROR: #{error}" if error
      msg.send "#{stdout}" if stdout
      msg.send "STDERR: #{stderr}" if stderr

  robot.respond /does (\S+) reference (\S+)/i, (msg) ->
    run(msg)

  robot.respond /(\S+) ref (\S+)/i, (msg) ->
    run(msg)

  