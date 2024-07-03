FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Pass the VITE_HOST environment variable at build time
ARG VITE_HOST
ENV VITE_HOST=${VITE_HOST}

RUN npm run build

EXPOSE 5200
CMD [ "npm", "run", "dev" ]