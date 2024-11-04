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
        companyName: "Mazu Store",
        header: {
          firstLink: "Productos",
          secondLink: "Novedades",
          thirdLink: "Sobre Nosotros",
          seeAll: "Ver Todo",
          seeAllDescription:
            "Descubre nuestra gama completa de productos para consentir a tus mascotas",
          logoAlt: "Logo de Pet Haven",
          logoSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Flogo-mazu.svg?alt=media&token=660ba713-8e29-4c81-bb1e-92ab591e117b",
        },
        hero: {
          title: "Todo lo que necesitas para el cuidado de tu mascota",
          description:
            "Explora nuestra colección de productos especialmente diseñados para mantener felices y saludables a tus mascotas.",
          buttonText: "Ver Productos",
          slug: "ver-todo",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fmazu-hero.svg?alt=media&token=3f86215d-c66d-4cf7-8b6f-57521095b0ab",
          imageAlt: "Imagen de productos para mascotas",
        },
        categories: {
          title: "Categorías",
        },
        banner: {
          title: "Semana de Bienestar Animal",
          description:
            "Únete a nosotros en la Semana de Bienestar Animal para descubrir ofertas exclusivas y consejos de expertos en cuidado de mascotas.",
          buttonText: "Participar Ahora",
          slug: "ver-todo",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg",
          imageAlt: "Banner Semana de Bienestar Animal",
        },
        testimonial: {
          logoSrc:
            "https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg",
          quote:
            "“Nuestros clientes valoran la calidad y variedad de nuestros productos. Nos apasiona cuidar a las mascotas tanto como a sus dueños.”",
          authorImageSrc:
            "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
          authorName: "Carlos Pérez",
          authorRole: "Fundador de Pet Haven",
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
        slug: "mazu-store",
      },
    );

    console.table(identity.map((identity) => identity.get({ plain: true }))); // Mostrar identidades en formato tabla

    // Insertar categorías con slug generado
    const categories = await Category.bulkCreate(
      [
        {
          name: "Collares",
          slug: slugify("Collares", { lower: true }),
          description: "Collares de calidad para mascotas",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcategoria-collares.svg?alt=media&token=eaa347c1-bb61-461d-94b5-f7901c58c5f5",
          imageAlt:
            "Varios collares coloridos para perros y gatos en diferentes tamaños.",
          href: "/categories",
        },
        {
          name: "Placas de Identificación",
          slug: slugify("Placas de Identificación", { lower: true }),
          description: "Placas de identificación personalizadas",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcategoria-tags.svg?alt=media&token=e3568b66-6fd1-4841-a42f-3ae6e3b86d41",
          imageAlt: "Placas de identificación personalizadas para mascotas.",
          href: "/categories",
        },
      ],
      { returning: true }
    );

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
          name: "Collares de Cuero",
          slug: slugify("Collares de Cuero", { lower: true }),
          categoryId: collarsCategoryId,
        },
        {
          name: "Collares de Nylon",
          slug: slugify("Collares de Nylon", { lower: true }),
          categoryId: collarsCategoryId,
        },
        // Subcategorías para la categoría "Placas de Identificación"
        {
          name: "Placas de Acero Inoxidable",
          slug: slugify("Placas de Acero Inoxidable", { lower: true }),
          categoryId: idTagsCategoryId,
        },
        {
          name: "Placas de Aluminio",
          slug: slugify("Placas de Aluminio", { lower: true }),
          categoryId: idTagsCategoryId,
        },
      ],
      { returning: true }
    );

    console.table(
      subcategories.map((subcategory) => subcategory.get({ plain: true }))
    ); // Mostrar subcategorías en formato tabla

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
          name: "Collar de Cuero Terracota",
          slug: slugify("Collar de Cuero Terracota", { lower: true }),
          price: 28,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-1.svg?alt=media&token=5b1ae060-00b3-4342-bff7-b1d35d840980",
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
          description:
            "Un collar de cuero azul que añade un toque moderno al look de tu mascota.",
          highlights: JSON.stringify([
            "Cuero de primera calidad",
            "Cómodo y seguro",
            "Ajustable para un ajuste perfecto",
          ]),
          details:
            "Este collar azul es ideal para cualquier actividad, ya sea en casa o al aire libre.",
        },
        {
          name: "Collar de Cuero Negro Tachuelas",
          slug: slugify("Collar de Cuero Negro Tachuelas", { lower: true }),
          price: 28,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-2.svg?alt=media&token=dd82ec1f-d9cc-4657-add0-e671b79b3fed",
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
          description:
            "Un collar de cuero rojo vibrante que destaca la personalidad de tu mascota.",
          highlights: JSON.stringify([
            "Cuero de alta calidad",
            "Estilo elegante",
            "Ajustable para un ajuste perfecto",
          ]),
          details:
            "Este collar rojo es perfecto para paseos y ocasiones especiales.",
        },
        {
          name: "Collar de Cuero Rosa con Tachuelas",
          slug: slugify("Collar de Cuero Rosa con Tachuelas", { lower: true }),
          price: 28,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-3.svg?alt=media&token=d14d1ca1-47b5-4213-892b-58443046abbf",
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
          description:
            "Un collar de cuero verde, ideal para mascotas aventureras.",
          highlights: JSON.stringify([
            "Cuero suave y resistente",
            "Diseño moderno",
            "Ajustable para un ajuste perfecto",
          ]),
          details:
            "Este collar verde es perfecto para el uso diario y aventuras al aire libre.",
        },
        {
          name: "Collar de Cuero Verde",
          slug: slugify("Collar de Cuero Verde", { lower: true }),
          price: 28,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-4.svg?alt=media&token=d5404c16-ce28-431c-b1ad-8e986bfcc6aa",
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
          description:
            "Un collar de cuero marrón que combina confort y estilo.",
          highlights: JSON.stringify([
            "Cuero de calidad superior",
            "Duradero y resistente",
            "Ajustable para un ajuste perfecto",
          ]),
          details: "Este collar verde es perfecto para el uso diario y paseos.",
        },
        {
          name: "Collar de Cuero Naranja",
          slug: slugify("Collar de Cuero Naranja", { lower: true }),
          price: 28,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Fcollar-5.svg?alt=media&token=54e1938c-ec39-4b84-bab6-73d3980538e9",
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
          description:
            "Un collar de cuero marrón que combina confort y estilo.",
          highlights: JSON.stringify([
            "Cuero de calidad superior",
            "Duradero y resistente",
            "Ajustable para un ajuste perfecto",
          ]),
          details:
            "Este collar naranja es perfecto para el uso diario y paseos.",
        },
        // placas
        {
          name: "Placa de Identificación de Aluminio Azul",
          slug: slugify("Placa de Identificación de Aluminio Azul", {
            lower: true,
          }),
          price: 15,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-1.svg?alt=media&token=39053f9d-cc1c-4b39-8aca-c115a2bb66b6",
          imageAlt: "Placa de identificación de aluminio color rosa.",
          stock: 30,
          subcategoryId: aluminumIdTagSubcategoryId,
          description:
            "Placa de identificación de aluminio color rosa, ligera y duradera.",
          highlights: JSON.stringify([
            "Personalizable",
            "Ligera y resistente",
            "Perfecta para cualquier collar",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details:
            "Esta placa es ideal para identificación de mascotas, con un acabado brillante y una gran capacidad de grabado.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Amarillo",
          slug: slugify("Placa de Identificación de Aluminio Color Amarillo", {
            lower: true,
          }),
          price: 15,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-5.svg?alt=media&token=33e23609-552a-4b40-91ae-bc5ce5f967f4",
          imageAlt: "Placa de identificación de aluminio color azul.",
          stock: 25,
          subcategoryId: aluminumIdTagSubcategoryId,
          description:
            "Placa de identificación de aluminio color azul, ideal para mascotas.",
          highlights: JSON.stringify([
            "Personalizable",
            "Duradera",
            "Compatible con todos los collares",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details:
            "Esta placa azul es perfecta para cualquier collar y ofrece una personalización única.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Verde",
          slug: slugify("Placa de Identificación de Aluminio Color Verde", {
            lower: true,
          }),
          price: 15,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-4.svg?alt=media&token=b2d5fd04-166c-4f24-88ff-c93dbf11d57b",
          imageAlt: "Placa de identificación de aluminio color verde.",
          stock: 20,
          subcategoryId: aluminumIdTagSubcategoryId,
          description:
            "Placa de identificación de aluminio color verde, ligera y funcional.",
          highlights: JSON.stringify([
            "Personalizable",
            "Resistente a la corrosión",
            "Perfecta para paseos",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details:
            "Esta placa es ideal para el uso diario, combinando durabilidad y estilo.",
        },
        {
          name: "Placa de Identificación de Acero Inoxidable",
          slug: slugify("Placa de Identificación de Acero Inoxidable", {
            lower: true,
          }),
          price: 20,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-2.svg?alt=media&token=ad37c342-15fc-4629-917a-1da77c60fc8a",
          imageAlt: "Placa de identificación de acero inoxidable.",
          stock: 15,
          subcategoryId: stainlessSteelIdTagSubcategoryId,
          description:
            "Placa de identificación de acero inoxidable, ideal para máxima durabilidad.",
          highlights: JSON.stringify([
            "Inoxidable y resistente",
            "Personalizable",
            "Diseño elegante",
          ]),
          material: "Acero inoxidable",
          warranty: "1 año",
          careInstructions: "Lavar con agua y jabón suave.",
          details:
            "Con un diseño elegante y funcional, esta placa es perfecta para aquellos que buscan durabilidad.",
        },
        {
          name: "Placa de Identificación de Aluminio Color Rosado",
          slug: slugify("Placa de Identificación de Aluminio Color Rosado", {
            lower: true,
          }),
          price: 15,
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/plantilla-ecommerce-3852b.appspot.com/o/tienda2%2Ftags-3.svg?alt=media&token=ff567a9b-1340-4b66-89d7-01973f06f016",
          imageAlt: "Placa de identificación de aluminio color negro.",
          stock: 18,
          subcategoryId: aluminumIdTagSubcategoryId,
          description:
            "Placa de identificación de aluminio color negro, ligera y resistente.",
          highlights: JSON.stringify([
            "Personalizable",
            "Duradera",
            "Ideal para cualquier collar",
          ]),
          material: "Aluminio",
          warranty: "6 meses",
          careInstructions: "Lavar con agua y jabón suave.",
          details:
            "Esta placa negra ofrece un toque sofisticado, perfecta para cualquier mascota.",
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
