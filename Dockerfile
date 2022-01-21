FROM docker.io/node:14-alpine

RUN mkdir /app
WORKDIR /app
RUN chown 1000 /app \
	&& chmod 0700 /app

ADD --chown=1000 bin /app/bin
ADD --chown=1000 external-scripts.json /app/external-scripts.json
ADD --chown=1000 package-lock.json /app/package-lock.json
ADD --chown=1000 package.json /app/package.json
ADD --chown=1000 scripts /app/scripts
ADD --chown=1000 fortunes.txt /app/fortunes.txt
ADD --chown=1000 deep_thoughts.txt /app/deep_thoughts.txt

ENV FORTUNES_FILE /app/fortunes.txt
ENV DEEP_THOUGHTS_FILE /app/deep_thoughts.txt

ENV PATH "$$PATH:/usr/local/bin:/app/node_modules/.bin"
RUN /usr/local/bin/npm install

USER 1000
ENTRYPOINT /app/bin/hubot
CMD ["--adapter", "slack"]
