
NODE_IMAGE  := $(shell grep 'FROM' Dockerfile | cut -d' ' -f2)
OCI_RUNTIME := $(shell command -v podman 2>/dev/null || command -v docker)

ifeq ($(OCI_RUNTIME),)
$(error either podman or docker are required)
endif

build:
	$(OCI_RUNTIME) build . \
		-t registry.gitlab.com/blockloop/hubot:$(shell git rev-parse --short HEAD)

run:
	$(OCI_RUNTIME) run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		--env-file hubot.env \
		--entrypoint $(PWD)/bin/hubot \
		$(NODE_IMAGE)

packages:
	$(OCI_RUNTIME) run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		$(NODE_IMAGE) \
		npm install --save

