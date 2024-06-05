FROM node:20

ENV ENVIRONMENT=production
ENV POSTGRESQL_URL null
ENV POSTGRESQL_DIALECT=postgres
ENV POSTGRESQL_SSL_CA='/certificado/ca.crt'

COPY package*.json .

RUN npm ci

COPY ca.crt /certificado/ca.crt

COPY src src

COPY server.js .

EXPOSE 8080

ENTRYPOINT [ "node", "server.js" ] 

HEALTHCHECK --interval=60s --timeout=60s --retries=3 CMD curl --silent --fail http://localhost:8080/health || exit 1