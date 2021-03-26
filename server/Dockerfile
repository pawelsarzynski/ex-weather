FROM node:14.15.4-alpine AS development

ARG port

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli rimraf

RUN yarn install --silent

COPY . .

RUN yarn build

EXPOSE $port 5555

FROM node:14.15.4-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --silent --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
