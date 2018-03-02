FROM node:8-stretch

ADD . /app
WORKDIR /app
ENV PATH "$$PATH:/app/node_modules/.bin"

ENTRYPOINT /app/bin/hubot --adapter slack
