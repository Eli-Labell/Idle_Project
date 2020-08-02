FROM node:latest

EXPOSE 8080
WORKDIR /app
#COPY img ./img
#COPY src ./src
#COPY css ./css
COPY . .

RUN yarn
STOPSIGNAL SIGTERM
ENTRYPOINT ["yarn", "start", "--host","0.0.0.0", "--disable-host-check"]