
NODE_IMAGE  := $(shell grep 'FROM' Dockerfile | cut -d' ' -f2)
OCI_RUNTIME := $(shell command -v podman 2>/dev/null || command -v docker || echo "docker or podman")

build: $(OCI_RUNTIME)
	$(OCI_RUNTIME) build . \
		-t registry.gitlab.com/blockloop/hubot:$(shell git rev-parse --short HEAD)

run: $(OCI_RUNTIME)
	$(OCI_RUNTIME) run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		--env-file hubot.env \
		--entrypoint $(PWD)/bin/hubot \
		$(NODE_IMAGE)

packages: $(OCI_RUNTIME)
	$(OCI_RUNTIME) run \
		--rm \
		-it \
		-v "$(CURDIR):$(CURDIR):z" \
		-w "$(CURDIR)" \
		$(NODE_IMAGE) \
		npm install --save

# used for scripts/fortune.js
fortunes.txt: fortunes.tar.gz
	@tar -zxf $<
	@cat fortune-master/datfiles/{fortunes,fortunes2,fortunes2-o,fortunes-o,limerick,startrek} > $@

fortunes.tar.gz:
	@curl -LJ -o fortunes.tar.gz 'https://github.com/ahills/fortune/archive/master.tar.gz'

