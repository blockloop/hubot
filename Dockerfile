FROM node:8-stretch

RUN mkdir /app

ADD bin /app/bin
ADD external-scripts.json /app/external-scripts.json
ADD package-lock.json /app/package-lock.json
ADD package.json /app/package.json
ADD scripts /app/scripts

WORKDIR /app
ENV PATH "$$PATH:/usr/local/bin:/app/node_modules/.bin"
RUN /usr/local/bin/npm install

ENTRYPOINT /app/bin/hubot --adapter slack
