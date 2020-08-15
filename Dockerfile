FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install 
COPY . .

RUN cd user_interface && npm run build && cp -r ./build/* ../react-build/

EXPOSE 3001
CMD ["node", "server.js"]
