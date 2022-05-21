FROM node:14.19-alpine as builder
WORKDIR /opt/app/
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm install && npm run prebuild && npm run build && npm prune --production

FROM node:14.19-alpine as server
WORKDIR /opt/app/
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json
CMD ["node", "dist/main.js"]
