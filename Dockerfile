FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/build ./build
EXPOSE 1337
CMD ["npm", "start"]

#https://rsbh.dev/blogs/rest-api-express-typescript-docker