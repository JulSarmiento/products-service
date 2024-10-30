import sequelize from "../utils/postgresql.config.js";
import slugify from "slugify"; // Importar el paquete slugify

import {
  Product,
  Category,
  Subcategory,
  Order,
  Cart,
  Identity,
} from "../models/index.js";

(async () => {
  try {
    // Elimina las tablas y las vuelve a crear
    await sequelize.drop({ cascade: true });
    await sequelize.sync({ force: true });

    // Eliminar la tabla de órdenes
    await Order.drop({ cascade: true });

    // Crear la tabla de carritos
    await Cart.sync();

    // Crear la tabla de identidad
    await Identity.sync();

    const identity = await Identity.bulkCreate([
      {
        companyName: "Tech Haven",
        header: {
          companyName: "Tech Haven",
          firstLink: "Productos",
          secondLink: "Novedades",
          thirdLink: "Sobre Nosotros",
          seeAll: "Explorar todo",
          seeAllDescription:
            "Descubre nuestra gama completa de productos innovadores",
          logoAlt: "Logo de Tech Haven",
          logoSrc:
            "https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg",
        },
        hero: {
          title: "Tecnología de vanguardia a tu alcance",
          description:
            "Sumérgete en nuestro catálogo de productos que transformarán la forma en que vives y trabajas, con las últimas innovaciones tecnológicas.",
          buttonText: "Ver Productos",
          slug: "explorar-todo",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
          imageAlt: "Imagen de productos tecnológicos",
        },
        categories: {
          title: "Categorías Destacadas",
        },
        banner: {
          title: "Tech Expo 2023",
          description:
            "Acompáñanos en San Francisco del 15 al 17 de septiembre para descubrir el futuro de la tecnología.",
          buttonText: "Regístrate aquí",
          slug: "tech-expo",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/home-page-02-sale-full-width.jpg",
          imageAlt: "Banner Tech Expo 2023",
        },
        testimonial: {
          logoSrc:
            "https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg",
          quote:
            "“Nuestros clientes aman la calidad y comodidad de nuestros productos. Nos esforzamos por superar sus expectativas todos los días.”",
          authorImageSrc:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          authorName: "Darth Vader",
          authorRole: "CEO de Vader Store",
        },
      },
      {
        companyName: "Mazu Store",
        header: {
          companyName: "Mazu Store",
          firstLink: "Productos",
          secondLink: "Novedades",
          thirdLink: "Sobre Nosotros",
          seeAll: "Ver todo",
          seeAllDescription: "Descubre todos los productos que tenemos para ti",
          logoAlt: "Logo de Tu Empresa",
          logoSrc:
            "https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg",
        },
        hero: {
          title: "Los estilos de verano finalmente están aquí",
          description:
            "Este año, nuestra nueva colección de verano te protegerá de los duros elementos de un mundo que no le importa si vives o mueres.",
          buttonText: "Comprar Colección",
          slug: "ver-todo",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
          imageAlt: "Imagen de la colección de verano",
        },
        categories: {
          title: "Colecciones",
        },
        banner: {
          title: "GeneriCon 2023",
          slug: "ver-todo",
          description:
            "Únete a nosotros en Denver del 7 al 9 de junio para ver lo que viene a continuación.",
          buttonText: "Regístrate ahora",
        },
        testimonial: {
          logoSrc:
            "https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg",
          quote:
            "“Nuestros clientes aman la calidad y comodidad de nuestros productos. Nos esforzamos por superar sus expectativas todos los días.”",
          authorImageSrc:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          authorName: "Judith Black",
          authorRole: "CEO de Workcation",
        },
      },
    ]);

    console.table(identity.map((identity) => identity.get({ plain: true }))); // Mostrar identidades en formato tabla

    // Insertar categorías con slug generado
    const categories = await Category.bulkCreate(
      [
        {
          name: "Mujer",
          slug: slugify("Mujer", { lower: true }),
          description: "Última moda para mujeres",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Modelos sentados espalda con espalda, usando camiseta básica en negro y hueso.",
          href: "/categories",
        },
        {
          name: "Hombre",
          slug: slugify("Hombre", { lower: true }),
          description: "Última moda para hombres",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Parte superior con cordón con cierre de bucle elástico y acolchado interior texturizado.",
          href: "/categories",
        },
        {
          name: "Accesorios",
          slug: slugify("Accesorios", { lower: true }),
          description: "Accesorios de moda",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/home-page-02-edition-03.jpg",
          imageAlt:
            "Colección de cuatro botellas de viaje aisladas en un estante de madera.",
          href: "/categories",
        },
      ],
      { returning: true }
    );

    const accesoriosCategoryId = categories.find(
      (category) => category.name === "Accesorios"
    ).id;
    const hombreCategoryId = categories.find(
      (category) => category.name === "Hombre"
    ).id;
    const mujerCategoryId = categories.find(
      (category) => category.name === "Mujer"
    ).id;

    console.table(categories.map((category) => category.get({ plain: true }))); // Mostrar categorías en formato tabla

    // Insertar subcategorías con slug generado
    const subcategories = await Subcategory.bulkCreate(
      [
        {
          name: "Camisetas",
          slug: slugify("Camisetas", { lower: true }),
          categoryId: hombreCategoryId,
        },
        {
          name: "Chaquetas",
          slug: slugify("Chaquetas", { lower: true }),
          categoryId: hombreCategoryId,
        },
        {
          name: "Termos",
          slug: slugify("Termos", { lower: true }),
          categoryId: accesoriosCategoryId,
        },
        {
          name: "Agendas",
          slug: slugify("Agendas", { lower: true }),
          categoryId: accesoriosCategoryId,
        },
        {
          name: "Blusas",
          slug: slugify("Blusas", { lower: true }),
          categoryId: mujerCategoryId,
        },
        {
          name: "Vestidos",
          slug: slugify("Vestidos", { lower: true }),
          categoryId: mujerCategoryId,
        },
      ],
      { returning: true }
    );

    console.table(
      subcategories.map((subcategory) => subcategory.get({ plain: true }))
    ); // Mostrar subcategorías en formato tabla

    const camisetasSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Camisetas"
    ).id;
    const blusasSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Blusas"
    ).id;
    const termosSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Termos"
    ).id;
    const agendasSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Agendas"
    ).id;

    // Insertar productos con slug generado
    const products = await Product.bulkCreate(
      [
        {
          name: "Blusa Básica Negra",
          slug: slugify("Blusa Básica Negra", { lower: true }),
          price: 20,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
          imageAlt:
            "Cerca de un paquete de camisetas básicas de otoño con camisetas en blanco roto, ocre, oliva y negro.",
          stock: 30,
          subcategoryId: blusasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "White",
              class: "bg-white",
              selectedClass: "ring-gray-400",
            },
            {
              name: "Gray",
              class: "bg-gray-200",
              selectedClass: "ring-gray-400",
            },
            {
              name: "Black",
              class: "bg-gray-900",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "XXS", inStock: false },
            { name: "XS", inStock: true },
            { name: "S", inStock: true },
            { name: "M", inStock: true },
            { name: "L", inStock: true },
            { name: "XL", inStock: true },
            { name: "2XL", inStock: true },
            { name: "3XL", inStock: true },
          ]),
          description:
            'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
          highlights: JSON.stringify([
            "Hand cut and sewn locally",
            "Dyed with our proprietary colors",
            "Pre-washed & pre-shrunk",
            "Ultra-soft 100% cotton",
          ]),
          details:
            'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
        },
        {
          name: "Camiseta Básica Crema",
          slug: slugify("Camiseta Básica Crema", { lower: true }),
          price: 35,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
          imageAlt:
            "Modelos sentados espalda con espalda, usando camiseta básica en negro y hueso.",
          stock: 20,
          subcategoryId: camisetasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Cream",
              class: "bg-cream",
              selectedClass: "ring-cream-400",
            },
            {
              name: "Beige",
              class: "bg-beige",
              selectedClass: "ring-beige-400",
            },
          ]),
          sizes: JSON.stringify([
            { name: "XS", inStock: true },
            { name: "S", inStock: true },
            { name: "M", inStock: true },
            { name: "L", inStock: true },
            { name: "XL", inStock: true },
          ]),
          description:
            "The Cream Basic Tee is perfect for any occasion. Made from ultra-soft cotton, it provides comfort and style.",
          highlights: JSON.stringify([
            "Hand cut and sewn locally",
            "Dyed with our proprietary colors",
            "Pre-washed & pre-shrunk",
            "Ultra-soft 100% cotton",
          ]),
          details:
            "Available in cream and beige, this tee is a must-have for your wardrobe.",
        },
        {
          name: "Camiseta Básica Gris",
          slug: slugify("Camiseta Básica Gris", { lower: true }),
          price: 89,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
          imageAlt:
            "Parte superior con cordón con cierre de bucle elástico y acolchado interior texturizado.",
          stock: 10,
          subcategoryId: camisetasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Gray",
              class: "bg-gray-200",
              selectedClass: "ring-gray-400",
            },
            {
              name: "Dark Gray",
              class: "bg-gray-700",
              selectedClass: "ring-gray-700",
            },
          ]),
          sizes: JSON.stringify([
            { name: "S", inStock: true },
            { name: "M", inStock: true },
            { name: "L", inStock: true },
            { name: "XL", inStock: true },
          ]),
          description:
            "The Gray Basic Tee is a versatile addition to your wardrobe. Made from high-quality cotton, it offers both comfort and durability.",
          highlights: JSON.stringify([
            "Hand cut and sewn locally",
            "Dyed with our proprietary colors",
            "Pre-washed & pre-shrunk",
            "Ultra-soft 100% cotton",
          ]),
          details:
            "Available in light and dark gray, this tee is perfect for any casual outing.",
        },
        {
          name: "Blusa Básica con Puntos",
          slug: slugify("Blusa Básica con Puntos", { lower: true }),
          price: 120,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg",
          imageAlt:
            "Mano sosteniendo un lápiz mecánico de acero negro mecanizado con punta y parte superior de latón.",
          stock: 15,
          subcategoryId: blusasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Black with White Dots",
              class: "bg-black-dots",
              selectedClass: "ring-black-dots",
            },
            {
              name: "White with Black Dots",
              class: "bg-white-dots",
              selectedClass: "ring-white-dots",
            },
          ]),
          sizes: JSON.stringify([
            { name: "XS", inStock: true },
            { name: "S", inStock: true },
            { name: "M", inStock: true },
            { name: "L", inStock: true },
            { name: "XL", inStock: true },
          ]),
          description:
            "The Basic Blouse with Dots is a stylish and comfortable choice for any occasion. Made from high-quality fabric, it features a playful dot pattern.",
          highlights: JSON.stringify([
            "Hand cut and sewn locally",
            "Dyed with our proprietary colors",
            "Pre-washed & pre-shrunk",
            "Ultra-soft fabric",
          ]),
          details:
            "Available in black with white dots and white with black dots, this blouse is a fun addition to your wardrobe.",
        },
        {
          name: "Paquete de Blusas Básicas Gráficas",
          slug: slugify("Paquete de Blusas Básicas Gráficas", { lower: true }),
          price: 25,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Tres camisetas en gris, blanco y azul dispuestas sobre una mesa con el mismo dibujo lineal de manos y formas superpuestas en la parte delantera de la camiseta.",
          stock: 5,
          subcategoryId: blusasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Gray",
              class: "bg-gray-200",
              selectedClass: "ring-gray-400",
            },
            {
              name: "White",
              class: "bg-white",
              selectedClass: "ring-white-400",
            },
            {
              name: "Blue",
              class: "bg-blue-500",
              selectedClass: "ring-blue-500",
            },
          ]),
          sizes: JSON.stringify([
            { name: "S", inStock: true },
            { name: "M", inStock: true },
            { name: "L", inStock: true },
            { name: "XL", inStock: true },
          ]),
          description:
            "The Graphic Basic Blouse Pack includes three stylish blouses with unique graphic designs. Made from high-quality fabric, they offer both comfort and style.",
          highlights: JSON.stringify([
            "Hand cut and sewn locally",
            "Dyed with our proprietary colors",
            "Pre-washed & pre-shrunk",
            "Ultra-soft fabric",
          ]),
          details:
            "Available in gray, white, and blue, this pack is perfect for adding variety to your wardrobe.",
        },
        {
          name: "Botella de Viaje",
          slug: slugify("Botella de Viaje", { lower: true }),
          price: 50,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
          imageAlt:
            "Botella aislada verde oliva con tapa de rosca acampanada y parte superior plana.",
          stock: 10,
          subcategoryId: termosSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Olive Green",
              class: "bg-olive-green",
              selectedClass: "ring-olive-green",
            },
            {
              name: "Black",
              class: "bg-black",
              selectedClass: "ring-black",
            },
          ]),
          sizes: JSON.stringify([
            { name: "500ml", inStock: true },
            { name: "750ml", inStock: true },
          ]),
          description:
            "The Travel Bottle is perfect for keeping your drinks hot or cold on the go. Made from high-quality materials, it is both durable and stylish.",
          highlights: JSON.stringify([
            "Insulated to keep drinks hot or cold",
            "Leak-proof design",
            "Available in multiple colors",
          ]),
          details:
            "Available in olive green and black, this bottle is a must-have for any traveler.",
        },
        {
          name: "Bloc de Notas",
          slug: slugify("Bloc de Notas", { lower: true }),
          price: 150,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
          imageAlt:
            "Persona usando un bolígrafo para tachar una tarea en una tarjeta de papel de productividad.",
          stock: 20,
          subcategoryId: agendasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "White",
              class: "bg-white",
              selectedClass: "ring-white",
            },
            {
              name: "Gray",
              class: "bg-gray-200",
              selectedClass: "ring-gray-400",
            },
          ]),
          sizes: JSON.stringify([
            { name: "A5", inStock: true },
            { name: "A4", inStock: true },
          ]),
          description:
            "The Notepad is perfect for jotting down notes and ideas. Made from high-quality paper, it offers a smooth writing experience.",
          highlights: JSON.stringify([
            "High-quality paper",
            "Available in multiple sizes",
            "Durable cover",
          ]),
          details:
            "Available in white and gray, this notepad is a great addition to your stationery collection.",
        },
        {
          name: "Cuaderno",
          slug: slugify("Cuaderno", { lower: true }),
          price: 70,
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
          imageAlt:
            "Mano sosteniendo un lápiz mecánico de acero negro mecanizado con punta y parte superior de latón.",
          stock: 15,
          subcategoryId: agendasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Black",
              class: "bg-black",
              selectedClass: "ring-black",
            },
            {
              name: "Brown",
              class: "bg-brown",
              selectedClass: "ring-brown",
            },
          ]),
          sizes: JSON.stringify([
            { name: "A5", inStock: true },
            { name: "A4", inStock: true },
          ]),
          description:
            "The Notebook is perfect for writing down your thoughts and ideas. Made from high-quality materials, it offers both durability and style.",
          highlights: JSON.stringify([
            "High-quality paper",
            "Durable cover",
            "Available in multiple sizes",
          ]),
          details:
            "Available in black and brown, this notebook is a must-have for any writer.",
        },
      ],
      { returning: true }
    );

    console.log(products);

    console.table(products.map((product) => product.get({ plain: true }))); // Mostrar productos en formato tabla

    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
