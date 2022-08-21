FROM node:14

WORKDIR /usr/src/app

ADD node_modules.tar.gz ./

COPY . ./

EXPOSE 3001

ENTRYPOINT ["npm"]
CMD ["start"]