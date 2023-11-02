FROM node:14-alpine

WORKDIR /app

# Add build dependencies
RUN apk --no-cache add python3 make g++

COPY /app/package.json .
COPY /app/package-lock.json .

RUN npm install

COPY  /app .

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["npm", "start"]
