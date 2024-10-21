import { Sequelize } from "sequelize";
import fs from "fs";
import envVariables from "../utils/env.config.js";

const { POSTGRESQL_SSL_CA, POSTGRESQL_DIALECT, POSTGRESQL_URL } = envVariables;
console.log(POSTGRESQL_SSL_CA);

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



