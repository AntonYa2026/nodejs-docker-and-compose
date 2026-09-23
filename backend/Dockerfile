FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY nest-cli.json tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM node:26-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm pkg delete devDependencies \
    && npm install --omit=dev --omit=optional \
    && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
