import sequelize from '../utils/postgresql.config.js';

(async () => {
  try {
    await sequelize.drop({ cascade: true, force: true });
    await sequelize.sync({ force: true });

    console.log("Database synchronized successfully");

  } catch (error) {
    console.error("Unable to reset and synchronize the database", error);
    process.exit(1);
  };
})();