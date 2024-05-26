import "dotenv/config.js"
import sequelize from "../utils/postgreslq.config.js";
import { Product } from "../models/index.js";

(async () => {
  try {
    await sequelize.drop({ cascade: true, force: true });
    await sequelize.sync();

    console.log("Seeding database...");

    const products = await Product.bulkCreate( [
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
    ])

    console.log("Products created");
    console.table(products.map(((product) => product.dataValues)))

  } catch (error) {
    console.error('Unable to connect to the database:', error);

  } 
})()

