import "dotenv/config";
import app from "./src/app.js";
import sequelize from './src/utils/postgreslq.config.js';

const PORT = process.env.PORT || 3000;

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