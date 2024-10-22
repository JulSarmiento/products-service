import sequelize from "../utils/postgresql.config.js";
import { Product, Category, Subcategory } from "../models/index.js";
import slugify from "slugify"; // Importar el paquete slugify

(async () => {
  try {
    // Elimina las tablas y las vuelve a crear
    await sequelize.drop({ cascade: true, force: true });
    await sequelize.sync();

    // Insertar categorías con slug generado
    const categories = await Category.bulkCreate([
      { name: 'Accesorios', slug: slugify('Accesorios', { lower: true }) },
      { name: 'Hombre', slug: slugify('Hombre', { lower: true }) },
      { name: 'Mujer', slug: slugify('Mujer', { lower: true }) }
    ], { returning: true });

    const accesoriosCategoryId = categories.find(category => category.name === 'Accesorios').id;
    const hombreCategoryId = categories.find(category => category.name === 'Hombre').id;
    const mujerCategoryId = categories.find(category => category.name === 'Mujer').id;

    console.table(categories.map(category => category.get({ plain: true }))); // Mostrar categorías en formato tabla

    // Insertar subcategorías con slug generado
    const subcategories = await Subcategory.bulkCreate([
      { name: 'Camisetas', slug: slugify('Camisetas', { lower: true }), categoryId: hombreCategoryId },
      { name: 'Chaquetas', slug: slugify('Chaquetas', { lower: true }), categoryId: hombreCategoryId },
      { name: 'Termos', slug: slugify('Termos', { lower: true }), categoryId: accesoriosCategoryId },
      { name: 'Agendas', slug: slugify('Agendas', { lower: true }), categoryId: accesoriosCategoryId },
      { name: 'Blusas', slug: slugify('Blusas', { lower: true }), categoryId: mujerCategoryId },
      { name: 'Vestidos', slug: slugify('Vestidos', { lower: true }), categoryId: mujerCategoryId }
    ], { returning: true });

    console.table(subcategories.map(subcategory => subcategory.get({ plain: true }))); // Mostrar subcategorías en formato tabla

    const camisetasSubcategoryId = subcategories.find(subcategory => subcategory.name === 'Camisetas').id;
    const blusasSubcategoryId = subcategories.find(subcategory => subcategory.name === 'Blusas').id;
    const termosSubcategoryId = subcategories.find(subcategory => subcategory.name === 'Termos').id;
    const agendasSubcategoryId = subcategories.find(subcategory => subcategory.name === 'Agendas').id;

    // Insertar productos con slug generado
    const products = await Product.bulkCreate([
      {
        name: 'Blusa Básica Negra',
        slug: slugify('Blusa Básica Negra', { lower: true }),
        price: 20,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: 'Cerca de un paquete de camisetas básicas de otoño con camisetas en blanco roto, ocre, oliva y negro.',
        stock: 30,
        subcategoryId: blusasSubcategoryId
      },
      {
        name: 'Camiseta Básica Crema',
        slug: slugify('Camiseta Básica Crema', { lower: true }),
        price: 35,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: 'Modelos sentados espalda con espalda, usando camiseta básica en negro y hueso.',
        stock: 20,
        subcategoryId: camisetasSubcategoryId
      },
      {
        name: 'Camiseta Básica Gris',
        slug: slugify('Camiseta Básica Gris', { lower: true }),
        price: 89,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: 'Parte superior con cordón con cierre de bucle elástico y acolchado interior texturizado.',
        stock: 10,
        subcategoryId: camisetasSubcategoryId
      },
      {
        name: 'Blusa Básica con Puntos',
        slug: slugify('Blusa Básica con Puntos', { lower: true }),
        price: 120,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: 'Mano sosteniendo un lápiz mecánico de acero negro mecanizado con punta y parte superior de latón.',
        stock: 15,
        subcategoryId: blusasSubcategoryId
      },
      {
        name: 'Paquete de Blusas Básicas Gráficas',
        slug: slugify('Paquete de Blusas Básicas Gráficas', { lower: true }),
        price: 25,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
        imageAlt: 'Tres camisetas en gris, blanco y azul dispuestas sobre una mesa con el mismo dibujo lineal de manos y formas superpuestas en la parte delantera de la camiseta.',
        stock: 5,
        subcategoryId: blusasSubcategoryId
      },
      {
        name: 'Botella de Viaje',
        slug: slugify('Botella de Viaje', { lower: true }),
        price: 50,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Botella aislada verde oliva con tapa de rosca acampanada y parte superior plana.',
        stock: 10,
        subcategoryId: termosSubcategoryId
      },
      {
        name: 'Bloc de Notas',
        slug: slugify('Bloc de Notas', { lower: true }),
        price: 150,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Persona usando un bolígrafo para tachar una tarea en una tarjeta de papel de productividad.',
        stock: 20,
        subcategoryId: agendasSubcategoryId
      },
      {
        name: 'Cuaderno',
        slug: slugify('Cuaderno', { lower: true }),
        price: 70,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Mano sosteniendo un lápiz mecánico de acero negro mecanizado con punta y parte superior de latón.',
        stock: 15,
        subcategoryId: agendasSubcategoryId
      }
    ], { returning: true });

    console.table(products.map(product => product.get({ plain: true }))); // Mostrar productos en formato tabla

    console.log('Datos insertados correctamente');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
