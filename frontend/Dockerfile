FROM node:22-alpine

WORKDIR /usr/src/freeapi-frontend-vue

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack install

RUN pnpm install

COPY . .

EXPOSE 5010

CMD ["pnpm", "dev"]