# Definindo variáveis de build
ARG USER=node
ARG WORKSPACE=/home/$USER/app

FROM node:23-slim AS builder

ARG WORKSPACE
WORKDIR $WORKSPACE

COPY package*.json $WORKSPACE/
RUN npm cache verify && npm install

COPY . $WORKSPACE

# wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm run build

FROM node:23-slim

ARG USER
ARG WORKSPACE
WORKDIR $WORKSPACE

RUN npm install -g npm@latest

COPY --from=builder $WORKSPACE/package*.json $WORKSPACE/

RUN npm install --production && npm prune --production

COPY --from=builder $WORKSPACE/dist $WORKSPACE/dist
COPY --from=builder $WORKSPACE/config $WORKSPACE/config
COPY --from=builder $WORKSPACE/.env $WORKSPACE/.env

# wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN chown -R $USER:$USER $WORKSPACE

USER $USER

EXPOSE 3000

CMD ["npm", "start"]
