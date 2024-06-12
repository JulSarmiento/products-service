# Microservicio de Productos

## Descripción

Este microservicio gestiona la información de los productos utilizando PostgreSQL. Proporciona operaciones CRUD básicas para los productos.

## Historia de Usuario

**Como** desarrolladora de backend, **quiero** crear un microservicio de API para gestionar productos utilizando PostgreSQL, **para** poder almacenar y gestionar la información de los productos de manera eficiente y segura.

## Tareas

1. **Configuración del Proyecto**
    - Crear un nuevo repositorio en GitHub para el microservicio de productos.
    - Inicializar un nuevo proyecto de Node.js con `npm init`.
    - Configurar el linter (e.g., ESLint) y formateador de código (e.g., Prettier).
    - Crear un archivo `.gitignore` y agregar `node_modules`, `.env`, y otros archivos innecesarios.

2. **Instalación de Dependencias**
    - Instalar las dependencias necesarias: `express`, `sequelize`, `pg`, `pg-hstore`, `dotenv`, `morgan`, y `http-status`.
    - Instalar las dependencias de desarrollo: `nodemon`, `eslint`, y `prettier`.

3. **Configuración de la Base de Datos**
    - Configurar el archivo `.env` para almacenar las variables de entorno (e.g., URI de PostgreSQL).
    - Crear un archivo de configuración para la conexión a PostgreSQL utilizando Sequelize.

4. **Definición del Modelo de Producto**
    - Crear un modelo de Sequelize para definir la estructura del modelo de Producto.
    - Definir los campos necesarios (e.g., `name`, `price`, `stock`, `createdAt`, `updatedAt`).

5. **Implementación de Controladores**
    - Implementar controladores para las operaciones CRUD:
        - `createProduct`: Crear un nuevo producto.
        - `getProduct`: Obtener un producto por ID.
        - `getAllProducts`: Obtener todos los productos.
        - `updateProduct`: Actualizar un producto por ID.
        - `deleteProduct`: Eliminar un producto por ID.

6. **Definición de Rutas**
    - Configurar las rutas en Express para mapear las operaciones CRUD a los controladores correspondientes.

7. **Middleware**
    - Implementar middleware para manejar errores y validaciones.
    - Configurar `morgan` para el registro de solicitudes HTTP.

8. **Pruebas**
    - Escribir pruebas unitarias para los modelos, controladores y rutas utilizando una biblioteca de pruebas (e.g., Jest, Mocha).

9. **Dockerización**
    - Crear un `Dockerfile` para el microservicio de productos.
    - Crear un archivo `docker-compose.yml` para orquestar el contenedor de PostgreSQL y el contenedor del microservicio de productos.

10. **Despliegue**
    - Configurar el despliegue del microservicio en Google Cloud Run.
    - Configurar una API Gateway en Google Cloud Platform (GCP) para gestionar las solicitudes entrantes.

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JulSarmiento/products-service/tree/main
   cd microservicio-productos

2. Instalar dependencias:

   ```bash
   npm install

3. Crear un archivo .env y configurar las variables de entorno:

   ```env
   POSTGRESQL_URL=postgresql://user:password@localhost:5432/productos
   PORT=3000

4. Iniciar el servidor:

   ```bash
   npm start

## Uso

### Endpoints

1. POST /products: Crear un nuevo producto.

2. GET /products/:id : Obtener un producto por ID.

3. GET /products: Obtener todos los productos.

4. PUT /products/:id : Actualizar un producto por ID.

5. DELETE /products/:id : Eliminar un producto por ID.

## Dockerización

1. Construir la imagen de Docker:

   ```bash
   docker build -t microservicio-productos .

2. Crear un archivo docker-compose.yml para orquestar los contenedores de PostgreSQL y el microservicio de productos:

   ```yaml
   version: '3.8'

   services:
      db:
         image: postgres:13
         environment:
            POSTGRES_DB: productos
            POSTGRES_USER: user
            POSTGRES_PASSWORD: password
         ports:
            - "5432:5432"
         volumes:
            - db_data:/var/lib/postgresql/data

      app:
         image: microservicio-productos
         build: .
         ports:
            - "8080:8080"
         environment:
            POSTGRESQL_URI: postgresql://user:password@db:5432/productos
         depends_on:
            - db

   volumes:
   db_data:

3. Iniciar los contenedores utilizando Docker Compose:

   ```bash
   docker-compose up


## Despliegue en Google Cloud Run

1. Crear y configurar un proyecto en Google Cloud Platform (GCP).

2. Autenticar el CLI de GCP:

   ```bash
   gcloud auth login

3. Crear un nuevo servicio en Cloud Run:

   ```bash
   gcloud run deploy microservicio-productos \
   --image gcr.io/your-project-id/microservicio-productos \
   --platform managed \
   --region us-central1 \
   --allow-unauthenticated

4. Configurar una API Gateway en GCP para gestionar las solicitudes entrantes:

   - Ir a la consola de API Gateway en GCP.
   - Crear una nueva API.
   - Configurar el endpoint de la API para redirigir las solicitudes al servicio de Cloud Run.
