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
        companyName: "Narc Ecommerce",
        header: {
          companyName: "Narc Ecommerce",
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
      },
{
        companyName: "Mazu Store",
        header: {
          companyName: "Mazu Store",
          firstLink: "Productos",
          secondLink: "Novedades",
          thirdLink: "Sobre Nosotros",
          seeAll: "Ver Todo",
          seeAllDescription: "Descubre nuestra gama completa de productos para consentir a tus mascotas",
          logoAlt: "Logo de Pet Haven",
          logoSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Flogo-mazu.svg?alt=media&token=660ba713-8e29-4c81-bb1e-92ab591e117b"
        },
        hero: {
          title: "Todo lo que necesitas para el cuidado de tu mascota",
          description: "Explora nuestra colección de productos especialmente diseñados para mantener felices y saludables a tus mascotas.",
          buttonText: "Ver Productos",
          slug: "ver-todo",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fmazu-hero.svg?alt=media&token=3f86215d-c66d-4cf7-8b6f-57521095b0ab",
          imageAlt: "Imagen de productos para mascotas"
        },
        categories: {
          title: "Categorías"
        },
        banner: {
          title: "Semana de Bienestar Animal",
          description: "Únete a nosotros en la Semana de Bienestar Animal para descubrir ofertas exclusivas y consejos de expertos en cuidado de mascotas.",
          buttonText: "Participar Ahora",
          slug: "ver-todo",
          imageSrc: "https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg",
          imageAlt: "Banner Semana de Bienestar Animal"
        },
        testimonial: {
          logoSrc: "https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg",
          quote: "“Nuestros clientes valoran la calidad y variedad de nuestros productos. Nos apasiona cuidar a las mascotas tanto como a sus dueños.”",
          authorImageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
          authorName: "Carlos Pérez",
          authorRole: "Fundador de Pet Haven"
        },
        colors: {
          primary: "#34495e", // Un tono oscuro de gris azulado
          secondary: "#1abc9c", // Un tono verde brillante
          tertiary: "#bdc3c7", // Un tono claro de gris
          background: "#ecf0f1", // Un tono muy claro de gris, casi blanco
          accent: "#f39c12", // Un tono naranja como color de acento
          accentHover: "#e67e22", // Un tono más oscuro de naranja al hacer hover
          transparent: "transparent", // Color transparente
          transparentPrimary: "rgba(52, 152, 219, 0.1)", // Color primario transparente
          transparentSecondary: "rgba(26, 188, 156, 0.1)", // Color secundario transparente
        },
        slug: "mazu-store"
      }
    ]);

    console.table(identity.map((identity) => identity.get({ plain: true }))); // Mostrar identidades en formato tabla

    // Insertar categorías con slug generado
    const categories = await Category.bulkCreate(
      [
        {
          name: "Mujer",
          store: "narc-ecommerce",
          slug: slugify("Mujer", { lower: true }),
          description: "Última moda para mujeres",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-mujer.svg?alt=media&token=d4ec125a-8a91-4071-9ab8-c12b5cb5271c",
          imageAlt: "Modelos sentados espalda con espalda, usando camiseta básica en negro y hueso.",
          href: "/categories",
        },
        {
          name: "Hombre",
          store: "narc-ecommerce",
          slug: slugify("Hombre", { lower: true }),
          description: "Última moda para hombres",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-hombre.svg?alt=media&token=8cde6e59-08ff-4769-b46a-c82f48d31235",
          imageAlt: "Parte superior con cordón con cierre de bucle elástico y acolchado interior texturizado.",
          href: "/categories",
        },
        {
          name: "Accesorios",
          store: "narc-ecommerce",
          slug: slugify("Accesorios", { lower: true }),
          description: "Accesorios de moda",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda1%2Fcategoria-accesorios.svg?alt=media&token=a79ef6d7-80b6-4310-a4fb-e4c0f2bd9392",
          imageAlt: "Colección de cuatro botellas de viaje aisladas en un estante de madera.",
          href: "/categories",
        },
        {
          name: "Collares",
          store: "mazu-store",
          slug: slugify("Collares", { lower: true }),
          description: "Collares de calidad para mascotas",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcategoria-collares.svg?alt=media&token=eaa347c1-bb61-461d-94b5-f7901c58c5f5",
          imageAlt: "Varios collares coloridos para perros y gatos en diferentes tamaños.",
          href: "/categories",
        },
        {
          name: "Placas de Identificación",
          store: "mazu-store",
          slug: slugify("Placas de Identificación", { lower: true }),
          description: "Placas de identificación personalizadas",
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcategoria-tags.svg?alt=media&token=e3568b66-6fd1-4841-a42f-3ae6e3b86d41",
          imageAlt: "Placas de identificación personalizadas para mascotas.",
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
    const collarsCategoryId = categories.find(
      (category) => category.name === "Collares"
    ).id;
    
    const idTagsCategoryId = categories.find(
      (category) => category.name === "Placas de Identificación"
    ).id;

    console.table(categories.map((category) => category.get({ plain: true }))); // Mostrar categorías en formato tabla

    // Insertar subcategorías con slug generado
    const subcategories = await Subcategory.bulkCreate(
      [
        {
          name: "Camisetas",
          store: "narc-ecommerce",
          slug: slugify("Camisetas", { lower: true }),
          categoryId: hombreCategoryId,
        },
        {
          name: "Chaquetas",
          store: "narc-ecommerce",
          slug: slugify("Chaquetas", { lower: true }),
          categoryId: hombreCategoryId,
        },
        {
          name: "Termos",
          store: "narc-ecommerce",
          slug: slugify("Termos", { lower: true }),
          categoryId: accesoriosCategoryId,
        },
        {
          name: "Agendas",
          store: "narc-ecommerce",
          slug: slugify("Agendas", { lower: true }),
          categoryId: accesoriosCategoryId,
        },
        {
          name: "Blusas",
          store: "narc-ecommerce",
          slug: slugify("Blusas", { lower: true }),
          categoryId: mujerCategoryId,
        },
        {
          name: "Vestidos",
          store: "narc-ecommerce",
          slug: slugify("Vestidos", { lower: true }),
          categoryId: mujerCategoryId,
        },
        {
          name: "Collares de Cuero",
          store: "mazu-store",
          slug: slugify("Collares de Cuero", { lower: true }),
          categoryId: collarsCategoryId,
        },
        {
          name: "Collares de Nylon",
          store: "mazu-store",
          slug: slugify("Collares de Nylon", { lower: true }),
          categoryId: collarsCategoryId,
        },      
        // Subcategorías para la categoría "Placas de Identificación"
        {
          name: "Placas de Acero Inoxidable",
          store: "mazu-store",
          slug: slugify("Placas de Acero Inoxidable", { lower: true }),
          categoryId: idTagsCategoryId,
        },
        {
          name: "Placas de Aluminio",
          store: "mazu-store",
          slug: slugify("Placas de Aluminio", { lower: true }),
          categoryId: idTagsCategoryId,
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

    const leatherCollarsSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Collares de Cuero"
    ).id;
    
    const nylonCollarsSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Collares de Nylon"
    ).id;
    
    const stainlessSteelIdTagSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Placas de Acero Inoxidable"
    ).id;
    
    const aluminumIdTagSubcategoryId = subcategories.find(
      (subcategory) => subcategory.name === "Placas de Aluminio"
    ).id;
    
    // Insertar productos con slug generado
    const products = await Product.bulkCreate(
      [
        {
          name: "Blusa Básica Palo de Rosa",
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
          store: "narc-ecommerce",
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
        },        
        // perros 
        {
          name: "Collar de Cuero Terracota",
          store: "mazu-store",
          slug: slugify("Collar de Cuero Terracota", { lower: true }),
          price: 28,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-1.svg?alt=media&token=5b1ae060-00b3-4342-bff7-b1d35d840980",
          imageAlt: "Collar de cuero azul para mascotas.",
          stock: 8,
          subcategoryId: leatherCollarsSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Azul",
              class: "bg-blue-600",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "Pequeño", inStock: true },
            { name: "Mediano", inStock: true },
            { name: "Grande", inStock: true },
          ]),
          description: "Un collar de cuero azul que añade un toque moderno al look de tu mascota.",
          highlights: JSON.stringify([
            "Cuero de primera calidad",
            "Cómodo y seguro",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar azul es ideal para cualquier actividad, ya sea en casa o al aire libre.",
        },
        {
          name: "Collar de Cuero Negro Tachuelas",
          store: "mazu-store",
          slug: slugify("Collar de Cuero Negro Tachuelas", { lower: true }),
          price: 28,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-2.svg?alt=media&token=dd82ec1f-d9cc-4657-add0-e671b79b3fed",
          imageAlt: "Collar de cuero rojo para mascotas.",
          stock: 10,
          subcategoryId: leatherCollarsSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Rojo",
              class: "bg-red-600",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "Pequeño", inStock: true },
            { name: "Mediano", inStock: true },
            { name: "Grande", inStock: true },
          ]),
          description: "Un collar de cuero rojo vibrante que destaca la personalidad de tu mascota.",
          highlights: JSON.stringify([
            "Cuero de alta calidad",
            "Estilo elegante",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar rojo es perfecto para paseos y ocasiones especiales.",
        },
        {
          name: "Collar de Cuero Rosa con Tachuelas",
          store: "mazu-store",
          slug: slugify("Collar de Cuero Rosa con Tachuelas", { lower: true }),
          price: 28,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-3.svg?alt=media&token=d14d1ca1-47b5-4213-892b-58443046abbf",
          imageAlt: "Collar de cuero verde para mascotas.",
          stock: 12,
          subcategoryId: leatherCollarsSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Verde",
              class: "bg-green-600",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "Pequeño", inStock: true },
            { name: "Mediano", inStock: true },
            { name: "Grande", inStock: true },
          ]),
          description: "Un collar de cuero verde, ideal para mascotas aventureras.",
          highlights: JSON.stringify([
            "Cuero suave y resistente",
            "Diseño moderno",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar verde es perfecto para el uso diario y aventuras al aire libre.",
        },
        {
          name: "Collar de Cuero Verde",
          store: "mazu-store",
          slug: slugify("Collar de Cuero Verde", { lower: true }),
          price: 28,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-4.svg?alt=media&token=d5404c16-ce28-431c-b1ad-8e986bfcc6aa",
          imageAlt: "Collar de cuero verde para mascotas.",
          stock: 10,
          subcategoryId: leatherCollarsSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Marrón",
              class: "bg-brown-600",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "Pequeño", inStock: true },
            { name: "Mediano", inStock: true },
            { name: "Grande", inStock: true },
          ]),
          description: "Un collar de cuero marrón que combina confort y estilo.",
          highlights: JSON.stringify([
            "Cuero de calidad superior",
            "Duradero y resistente",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar verde es perfecto para el uso diario y paseos.",
        },
        {
          name: "Collar de Cuero Naranja",
          store: "mazu-store",
          slug: slugify("Collar de Cuero Naranja", { lower: true }),
          price: 28,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-5.svg?alt=media&token=54e1938c-ec39-4b84-bab6-73d3980538e9",
          imageAlt: "Collar de cuero verde para mascotas.",
          stock: 10,
          subcategoryId: leatherCollarsSubcategoryId,
          colors: JSON.stringify([
            {
              name: "Marrón",
              class: "bg-brown-600",
              selectedClass: "ring-gray-900",
            },
          ]),
          sizes: JSON.stringify([
            { name: "Pequeño", inStock: true },
            { name: "Mediano", inStock: true },
            { name: "Grande", inStock: true },
          ]),
          description: "Un collar de cuero marrón que combina confort y estilo.",
          highlights: JSON.stringify([
            "Cuero de calidad superior",
            "Duradero y resistente",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar naranja es perfecto para el uso diario y paseos.",
        },
        // placas
        {
          name: "Placa de Identificación de Aluminio Azul",
          store: "mazu-store",
          slug: slugify("Placa de Identificación de Aluminio Azul", { lower: true }),
          price: 15,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-1.svg?alt=media&token=39053f9d-cc1c-4b39-8aca-c115a2bb66b6",
          imageAlt: "Placa de identificación de aluminio color rosa.",
          stock: 30,
          subcategoryId: aluminumIdTagSubcategoryId,
          description: "Placa de identificación de aluminio color rosa, ligera y duradera.",
          highlights: JSON.stringify([
            "Personalizable",
            "Ligera y resistente",
            "Perfecta para cualquier collar",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details: "Esta placa es ideal para identificación de mascotas, con un acabado brillante y una gran capacidad de grabado.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Amarillo",
          store: "mazu-store",
          slug: slugify("Placa de Identificación de Aluminio Color Amarillo", { lower: true }),
          price: 15,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-5.svg?alt=media&token=33e23609-552a-4b40-91ae-bc5ce5f967f4",
          imageAlt: "Placa de identificación de aluminio color azul.",
          stock: 25,
          subcategoryId: aluminumIdTagSubcategoryId,
          description: "Placa de identificación de aluminio color azul, ideal para mascotas.",
          highlights: JSON.stringify([
            "Personalizable",
            "Duradera",
            "Compatible con todos los collares",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details: "Esta placa azul es perfecta para cualquier collar y ofrece una personalización única.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Verde",
          store: "mazu-store",
          slug: slugify("Placa de Identificación de Aluminio Color Verde", { lower: true }),
          price: 15,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-4.svg?alt=media&token=b2d5fd04-166c-4f24-88ff-c93dbf11d57b",
          imageAlt: "Placa de identificación de aluminio color verde.",
          stock: 20,
          subcategoryId: aluminumIdTagSubcategoryId,
          description: "Placa de identificación de aluminio color verde, ligera y funcional.",
          highlights: JSON.stringify([
            "Personalizable",
            "Resistente a la corrosión",
            "Perfecta para paseos",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details: "Esta placa es ideal para el uso diario, combinando durabilidad y estilo.",
        },
        {
          name: "Placa de Identificación de Acero Inoxidable",
          store: "mazu-store",
          slug: slugify("Placa de Identificación de Acero Inoxidable", { lower: true }),
          price: 20,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-2.svg?alt=media&token=ad37c342-15fc-4629-917a-1da77c60fc8a",
          imageAlt: "Placa de identificación de acero inoxidable.",
          stock: 15,
          subcategoryId: stainlessSteelIdTagSubcategoryId,
          description: "Placa de identificación de acero inoxidable, ideal para máxima durabilidad.",
          highlights: JSON.stringify([
            "Inoxidable y resistente",
            "Personalizable",
            "Diseño elegante",
          ]),
          material: "Acero inoxidable",
          warranty: "1 año",
          careInstructions: "Lavar con agua y jabón suave.",
          details: "Con un diseño elegante y funcional, esta placa es perfecta para aquellos que buscan durabilidad.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Rosado",
          store: "mazu-store",
          slug: slugify("Placa de Identificación de Aluminio Color Rosado", { lower: true }),
          price: 15,
          imageSrc: "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-3.svg?alt=media&token=ff567a9b-1340-4b66-89d7-01973f06f016",
          imageAlt: "Placa de identificación de aluminio color negro.",
          stock: 18,
          subcategoryId: aluminumIdTagSubcategoryId,
          description: "Placa de identificación de aluminio color negro, ligera y resistente.",
          highlights: JSON.stringify([
            "Personalizable",
            "Duradera",
            "Ideal para cualquier collar",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details: "Esta placa negra ofrece un toque sofisticado, perfecta para cualquier mascota.",
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
