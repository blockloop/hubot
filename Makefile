
NODE_IMAGE := $(shell grep 'FROM' Dockerfile | cut -d' ' -f2)

run:
	podman run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		-e "CLEVERBOT_IO_API_KEY=BzuwFFJooFKzbQlDk99SwriuVZdmZtq9" \
		-e "CLEVERBOT_IO_API_USER=BCW2ZJew4HHgKYQ1" \
		--entrypoint $(PWD)/bin/hubot \
		$(NODE_IMAGE)

packages:
	podman run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		$(NODE_IMAGE) \
		npm install --save

build:
	podman build . -t registry.gitlab.com/blockloop/hubot:$(shell git rev-parse --short HEAD)
