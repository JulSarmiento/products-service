const envVariables = {
  PORT : process.env.PORT || 3000,
  ENVIRONMENT : process.env.NODE_ENV || 'development',

  // Database
  POSTGRESQL_URL : process.env.POSTGRESQL_URL,
  POSTGRESQL_DIALECT: process.env.POSTGRESQL_DIALECT || 'postgres',
  POSTGRESQL_SSL_CA: process.env.POSTGRESQL_SSL_CA,
}

export default envVariables;