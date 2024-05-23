import "dotenv/config.js"
import sequelize from "../utils/postgreslq.config.js";
import { Product } from "../models/index.js";

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Starting seeder');

    await sequelize.drop({ cascade: true, force: true });
    console.log("All tables deleted");

    await sequelize.sync();
    console.log("All tables created");

    const products = [
      {
        name: "Smartphone XYZ",
        price: 699.99,
        stock: 50,
      },
      {
        name: "Laptop ABC",
        price: 999.99,
        stock: 30,
      },
      {
        name: "Wireless Headphones",
        price: 199.99,
        stock: 100,
      }
    ]

    await Product.bulkCreate(products);
    console.log('Mock products have been added.');
    console.table(products.map((product) => product.name));

  }catch (error) {
    console.error('Unable to connect to the database:', error);

  } 
};

seedDatabase();