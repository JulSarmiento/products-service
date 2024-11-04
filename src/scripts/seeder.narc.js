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

    const identity = await Identity.create(
      {
        companyName: "Narc Ecommerce",
        header: {
          firstLink: "Colecciones",
          secondLink: "Novedades",
          thirdLink: "Nosotros",
          seeAll: "Ver Todo",
          seeAllDescription: "Descubre nuestra colección completa de moda contemporánea",
          logoAlt: "Logo de Moda Urbana",
          logoSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Flogo-narc.svg?alt=media&token=a03d0ed5-2bde-4dab-9979-80486d510959"
        },
        hero: {
          title: "Moda moderna para cada ocasión",
          description: "Explora nuestra colección de ropa que define estilo y comodidad para el día a día.",
          buttonText: "Ver Colección",
          slug: "ver-todo",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fhero-img.svg?alt=media&token=f5464867-ad4b-4c37-aedd-b4a19fd52f10",
          imageAlt: "Imagen de personas con ropa de moda"
        },
        categories: {
          title: "Categorías de Moda"
        },
        banner: {
          title: "Tendencias de Temporada",
          description: "Descubre las piezas que dominarán esta temporada y renueva tu estilo.",
          buttonText: "Ver Tendencias",
          slug: "ver-todo",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-01-category-feature.jpg",
          imageAlt: "Banner de tendencias de moda de temporada"
        },
        testimonial: {
          logoSrc: "https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg",
          quote: "“Nuestros clientes adoran la versatilidad y calidad de nuestras prendas. Nos esforzamos cada día para ofrecer lo mejor en moda.”",
          authorImageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
          authorName: "Jane Doe",
          authorRole: "CEO de Moda Urbana"
        },
        colors: {
          primary: "#2c3e50", // Un tono oscuro de azul
          secondary: "#3498db", // Un tono brillante de azul
          tertiary: "#95a5a6", // Un tono claro de gris
          background: "#ecf0f1", // Un tono muy claro de gris, casi blanco
          accent: "#e74c3c", // Un tono de rojo como color de acento
          accentHover: "#c0392b", // Un tono más oscuro de rojo al hacer hover
          transparent: "transparent", // Color transparente
          transparentPrimary: "rgba(44, 62, 80, 0.1)", // Color primario transparente
          transparentSecondary: "rgba(52, 152, 219, 0.1)", // Color secundario transparente
        },
        slug: "narc-ecommerce"
      });

    console.table(identity); // Mostrar identidades en formato tabla

    // Insertar categorías con slug generado
    const categories = await Category.bulkCreate(
      [
        {
          name: "Mujer",
          slug: slugify("Mujer", { lower: true }),
          description: "Última moda para mujeres",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-mujer.svg?alt=media&token=d4ec125a-8a91-4071-9ab8-c12b5cb5271c",
          imageAlt: "Modelos sentados espalda con espalda, usando camiseta básica en negro y hueso.",
          href: "/categories",
        },
        {
          name: "Hombre",
          slug: slugify("Hombre", { lower: true }),
          description: "Última moda para hombres",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-hombre.svg?alt=media&token=8cde6e59-08ff-4769-b46a-c82f48d31235",
          imageAlt: "Parte superior con cordón con cierre de bucle elástico y acolchado interior texturizado.",
          href: "/categories",
        },
        {
          name: "Accesorios",
          slug: slugify("Accesorios", { lower: true }),
          description: "Accesorios de moda",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-accesorios.svg?alt=media&token=a79ef6d7-80b6-4310-a4fb-e4c0f2bd9392",
          imageAlt: "Colección de cuatro botellas de viaje aisladas en un estante de madera.",
          href: "/categories",
        }
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
        }
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
          name: "Blusa Básica Palo de Rosa",
          slug: slugify("Blusa Básica Palo de Rosa", { lower: true }),
          price: 20,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fblusa-basica-1.svg?alt=media&token=652796f7-d3e0-42bb-87dd-5f31ae9b7704",
          imageAlt: "Cerca de una blusa básica de palo de rosa, ideal para el otoño.",
          stock: 30,
          subcategoryId: blusasSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Palo de Rosa",
              class: "bg-pink-300",
              selectedClass: "ring-gray-400",
            },
            {
              name: "Blanco",
              class: "bg-white",
              selectedClass: "ring-gray-400",
            },
            {
              name: "Gris",
              class: "bg-gray-200",
              selectedClass: "ring-gray-400",
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
          description: 'Esta blusa básica en palo de rosa es perfecta para cualquier ocasión, combinando comodidad y estilo. Confeccionada con materiales de alta calidad, esta prenda es una adición versátil a tu guardarropa.',
          highlights: JSON.stringify([
            "Corte y confección local",
            "Tejido suave y ligero",
            "Prelavada para evitar encogimiento",
            "100% algodón",
          ]),
          details: 'La blusa básica palo de rosa se adapta a cualquier estilo y se puede combinar fácilmente con tus prendas favoritas. Ideal para un look casual o para una ocasión especial. Disponible en varias tallas para un ajuste perfecto.',
        },
        {
          name: "Camiseta Azul",
          slug: slugify("Camiseta Azul", { lower: true }),
          price: 35,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcamiseta-basica-1.svg?alt=media&token=7183cb4b-b680-488b-be82-6b6afd00b0d8",
          imageAlt: "Modelos sentados espalda con espalda, usando camisetas básicas en negro y crema.",
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
          description: "La Camiseta Azul es ideal para cualquier ocasión. Confeccionada en algodón ultra suave, ofrece comodidad y estilo.",
          highlights: JSON.stringify([
            "Cortada y cosida localmente",
            "Tinte con colores exclusivos",
            "Prelavada y preencogida",
            "100% algodón ultra suave",
          ]),
          details: "Disponible en crema y beige, esta camiseta es un básico esencial en tu guardarropa.",
        },
        {
          name: "Camiseta Básica Gris",
          slug: slugify("Camiseta Básica Gris", { lower: true }),
          price: 89,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcamiseta-basica-2.svg?alt=media&token=d7bc1d3f-3ce2-444b-acfd-481693a1488a",
          imageAlt: "Parte superior con cordón y cierre elástico, con un interior acolchado texturizado.",
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
          description: "La Camiseta Básica Gris es una adición versátil a tu guardarropa. Confeccionada en algodón de alta calidad, combina comodidad y durabilidad.",
          highlights: JSON.stringify([
            "Cortada y cosida localmente",
            "Tinte con colores exclusivos",
            "Prelavada y preencogida",
            "100% algodón ultra suave",
          ]),
          details: "Disponible en gris claro y gris oscuro, esta camiseta es perfecta para cualquier salida casual.",
        },
        {
          name: "Blusa Básica Verde Oliva",
          slug: slugify("Blusa Básica Verde Oliva", { lower: true }),
          price: 120,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fblusa-basica-2.svg?alt=media&token=c2282047-26f0-41ee-bfa6-77f7d5632dea",
          imageAlt: "Mano sosteniendo un lápiz mecánico de acero negro con punta y parte superior de latón.",
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
          description: "La Blusa Básica Verde Oliva es una elección estilosa y cómoda para cualquier ocasión. Confeccionada en tejido de alta calidad, presenta un divertido patrón de puntos.",
          highlights: JSON.stringify([
            "Cortada y cosida localmente",
            "Tinte con colores exclusivos",
            "Prelavada y preencogida",
            "Tejido ultra suave",
          ]),
          details: "Disponible en negro con puntos blancos y blanco con puntos negros, esta blusa es una adición divertida a tu guardarropa.",
        },
        {
          name: "Blusa Básicas Gris",
          slug: slugify("Blusa Básicas Gris", { lower: true }),
          price: 25,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fblusa-basica-3.svg?alt=media&token=fd664c6f-8cc0-4ffc-ac9a-fc2deb4225cb",
          imageAlt: "Tres camisetas en gris, blanco y azul dispuestas sobre una mesa con un diseño lineal de manos en la parte delantera.",
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
          description: "El Pack de Blusas Básicas incluye tres blusas con diseños gráficos únicos. Confeccionadas en tejido de alta calidad, ofrecen tanto comodidad como estilo.",
          highlights: JSON.stringify([
            "Cortadas y cosidas localmente",
            "Tinte con colores exclusivos",
            "Prelavadas y preencogidas",
            "Tejido ultra suave",
          ]),
          details: "Disponible en gris, blanco y azul, este pack es ideal para añadir variedad a tu guardarropa.",
        },
        {
          name: "Botella de Viaje",
          slug: slugify("Botella de Viaje", { lower: true }),
          price: 50,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Ftermo-1.svg?alt=media&token=f3e0c44e-fcf0-4c7d-8170-9d352f4570e2",
          imageAlt: "Botella aislada verde oliva con tapa de rosca acampanada y parte superior plana.",
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
          description: "La Botella de Viaje es ideal para mantener tus bebidas calientes o frías mientras te desplazas. Fabricada con materiales de alta calidad, es duradera y elegante.",
          highlights: JSON.stringify([
            "Aislada para mantener bebidas calientes o frías",
            "Diseño a prueba de fugas",
            "Disponible en múltiples colores",
          ]),
          details: "Disponible en verde oliva y negro, esta botella es un imprescindible para cualquier viajero.",
        },
        {
          name: "Bloc de Notas",
          slug: slugify("Bloc de Notas", { lower: true }),
          price: 150,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fnotepad-1.svg?alt=media&token=3db02fe6-8ef8-483a-80a7-b8b0a7e60be0",
          imageAlt: "Persona usando un bolígrafo para tachar una tarea en una tarjeta de papel de productividad.",
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
          description: "El Bloc de Notas es ideal para anotar notas e ideas. Fabricado con papel de alta calidad, ofrece una experiencia de escritura suave.",
          highlights: JSON.stringify([
            "Papel de alta calidad",
            "Disponible en múltiples tamaños",
            "Cubierta duradera",
          ]),
          details: "Disponible en blanco y gris, este bloc es perfecto para el uso diario.",
        }
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
