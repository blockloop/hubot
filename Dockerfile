FROM docker.io/node:8-stretch

RUN mkdir /app

ADD bin /app/bin
ADD external-scripts.json /app/external-scripts.json
ADD package-lock.json /app/package-lock.json
ADD package.json /app/package.json
ADD scripts /app/scripts

RUN useradd -d /app --shell /bin/bash hubot && \
	chown -R hubot /app && \
	chmod -R 0700 /app

USER hubot

WORKDIR /app
ENV PATH "$$PATH:/usr/local/bin:/app/node_modules/.bin"

ENTRYPOINT /app/bin/hubot --adapter slack
