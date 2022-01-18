FROM node:14.18-alpine

USER $user

EXPOSE 3000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install react-scripts -g

ADD . /app

RUN chown -R node:node /app

CMD ["npm", "start:prod"]
