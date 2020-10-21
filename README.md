# Hubot

This is my Hubot. See [Contributing](CONTRIBUTING.md) if you want to
contribute. He currently runs on Slack. Ask me for an invite!

## Contributing

Scripts are all under the /scripts directory. Please follow the conventions used
within the existing scripts. Use promises, catch errors, log errors, etc.

## Testing

To run and test locally you will need [podman](https://podman.io/) or docker.

To run locally you can execute `make run`. TIP: you may not see the shell
immediately. Just press enter. This will enter you into a shell where you can
interact with hubot.

**IMPORTANT** the interactive shell will behave as if you are in a _room_ so
you must direct your messages at hubot if you want to test direct interaction.
In the interactive shell hubot is referred to as simply `hubot` (without the
@). If your script requires environment variables then you should add them to
the hubot.env file before executing `make run`. This file has been commited but
it is ignored so you cannot accidentally commit changes to it.
