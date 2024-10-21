import app from "./src/app.js";
import sequelize from './src/utils/postgresql.config.js';
import envVariables from './src/utils/env.config.js';

const PORT = envVariables.PORT || 3000;

(async () => {

  try{
    await sequelize.sync() ;
    console.log('Connection has been established successfully to PostgreSQL.');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);;
    process.exit((1));
  }
})();