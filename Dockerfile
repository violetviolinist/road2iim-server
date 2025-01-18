FROM node:lts

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.js index.js
COPY public public

RUN npm install

CMD ["node", "index.js"]
