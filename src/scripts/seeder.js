import sequelize from "../utils/postgresql.config.js";
import { Product } from "../models/index.js";

(async () => {
  try {
    await sequelize.drop({ cascade: true, force: true });
    await sequelize.sync();

    console.log("Seeding database...");

    const products = await Product.bulkCreate([
      {
        name: "Black Basic Tee",
        price: "$20",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
        imageAlt:
          "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        category: "Women",
        subCategory: "Tee",
      },
      {
        name: "Cream Basic Tee",
        href: "/details",
        price: "$35",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
        imageAlt:
          "Models sitting back to back, wearing Basic Tee in black and bone.",
      },
      {
        name: "Gray Basic Tee",
        href: "/details",
        price: "$89",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
        imageAlt:
          "Drawstring top with elastic loop closure and textured interior padding.",
      },
      {
        name: "Dotted Basic Tee",
        href: "/details",
        price: "$120",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg",
        imageAlt:
          "Hand holding black machined steel mechanical pencil with brass tip and top.",
      },
      {
        name: "Graphic Basic Tee Pack",
        href: "/details",
        price: "$25",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
        imageAlt:
          "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
      },
      {
        name: "Travel Bottle",
        href: "/details",
        price: "$50",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
        imageAlt:
          "Olive drab green insulated bottle with flared screw lid and flat top.",
      },
      {
        name: "Memo Pad",
        href: "/details",
        price: "$150",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
        imageAlt:
          "Person using a pen to cross a task off a productivity paper card.",
      },
      {
        name: "Notebook",
        href: "/details",
        price: "$70",
        imageSrc:
          "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
        imageAlt:
          "Hand holding black machined steel mechanical pencil with brass tip and top.",
      },
    ]);

    console.log("Products created");
    console.table(products.map((product) => product.dataValues));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
