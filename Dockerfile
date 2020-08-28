FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN cd ui-server && npm ci
RUN cd user_interface && npm ci && npm run build && mv ./build ../react-build

EXPOSE 3001 5000
CMD ["node", "ui-server/server.js"]
