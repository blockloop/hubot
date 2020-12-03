FROM docker.io/node:12-alpine

RUN mkdir /app
WORKDIR /app
RUN adduser \
	--disabled-password \
	--home /app \
	--shell /bin/bash \
	hubot \
	&& chown hubot /app \
	&& chmod 0700 /app

ADD --chown=hubot bin /app/bin
ADD --chown=hubot external-scripts.json /app/external-scripts.json
ADD --chown=hubot package-lock.json /app/package-lock.json
ADD --chown=hubot package.json /app/package.json
ADD --chown=hubot scripts /app/scripts
ADD --chown=hubot fortunes.txt /app/fortunes.txt
ADD --chown=hubot deep_thoughts.txt /app/deep_thoughts.txt

ENV FORTUNES_FILE /app/fortunes.txt
ENV DEEP_THOUGHTS_FILE /app/deep_thoughts.txt

ENV PATH "$$PATH:/usr/local/bin:/app/node_modules/.bin"
RUN /usr/local/bin/npm install

USER hubot
ENTRYPOINT /app/bin/hubot --adapter slack
