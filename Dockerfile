FROM node:20

ENV PORT_TO_USE=8080
ENV ENVIRONMENT=production
ENV POSTGRESQL_URL='postgresql://postgres:jmIFx3bqgYWjUAj7@tightly-polished-skimmer.data-1.use1.tembo.io:5432/postgres'
ENV POSTGRESQL_DIALECT=postgres
ENV POSTGRESQL_SSL_CA='/certificado/ca.crt'

COPY package*.json .

RUN npm ci

COPY ca.crt /certificado/ca.crt

COPY src src

COPY server.js .

RUN npm run seeder

EXPOSE 8080

ENTRYPOINT [ "node", "server.js" ] 

HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD curl --silent --fail http://localhost:8080/health || exit 1