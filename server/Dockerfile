FROM node:20-bullseye
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run prisma:generate
RUN npm run build
CMD ["npm", "start"]
