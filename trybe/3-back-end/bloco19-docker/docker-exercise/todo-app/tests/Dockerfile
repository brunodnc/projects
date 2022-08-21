FROM mjgargani/puppeteer:trybe1.0

WORKDIR /usr/src/app

ADD node_modules.tar.gz ./

COPY . ./

ENTRYPOINT ["npm"]
CMD ["test"]