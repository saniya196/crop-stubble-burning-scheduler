FROM node:20-alpine AS build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/frontend/dist ./dist

ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-c", "serve -s dist -l ${PORT}"]