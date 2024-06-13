import { Sequelize } from "sequelize";
import fs from "fs";

const POSTGRESQL_SSL_CA = process.env.POSTGRESQL_SSL_CA;
const POSTGRESQL_DIALECT = process.env.POSTGRESQL_DIALECT;
const POSTGRESQL_URL = process.env.POSTGRESQL_URL


const caCert = fs.readFileSync(POSTGRESQL_SSL_CA, {encoding:'utf8' });

export default new Sequelize(POSTGRESQL_URL, {
  dialect: POSTGRESQL_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
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



