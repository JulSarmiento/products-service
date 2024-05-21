import { Sequelize } from "sequelize";
import fs from "fs";

const POSTGRESQL_SSL_CA = process.env.POSTGRESQL_SSL_CA;
const POSTGRESQL_DIALECT = process.env.POSTGRESQL_DIALECT;
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD;
const POSTGRESQL_USERNAME = process.env.POSTGRESQL_USERNAME;

const caCert = fs.readFileSync(POSTGRESQL_SSL_CA);

const sequelize = new Sequelize(`postgresql://${POSTGRESQL_USERNAME}:${POSTGRESQL_PASSWORD}@tightly-polished-skimmer.data-1.use1.tembo.io:5432/${POSTGRESQL_USERNAME}`, {
  dialect: POSTGRESQL_DIALECT,
  dialectOptions: {
    ssl: {
      ca: caCert.toString(),
    },
  },
  define: {
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    underscore: true,
  },
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
  } catch (error) {
    console.error('Conexión fallida:', error);
  }
})();


export default sequelize;
