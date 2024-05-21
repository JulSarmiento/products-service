# Microservicio de Productos

## Historia de Usuario

**Título**: Desarrollo y Despliegue del Microservicio de Productos

**Descripción**: Como desarrollador, quiero desarrollar, contenerizar, desplegar y gestionar un microservicio para productos utilizando Docker y Google Cloud Platform (GCP) para asegurar una alta disponibilidad y escalabilidad.

## Tareas

### Fase 1: Configuración del Proyecto

1. **Creación del Repositorio**
   - Crear un nuevo repositorio en GitHub llamado `products-service`.
   - Clonar el repositorio en local.

2. **Inicialización del Proyecto**
   - Inicializar un proyecto Node.js.
   - Instalar las dependencias necesarias.

### Fase 2: Desarrollo del Microservicio

3. **Configuración del Servidor**
   - Crear y configurar el servidor Express en `index.js`.

4. **Modelos y Rutas**
   - Crear el modelo de producto en `productModel.js`.
   - Crear las rutas del producto en `productRoutes.js`.
   - Integrar las rutas en `index.js`.

5. **Archivos de Configuración**
   - Crear un archivo `.env` para las variables de entorno.
   - Añadir `.env` a `.gitignore`.

### Fase 3: Contenerización con Docker

6. **Creación del Dockerfile**
   - Crear un `Dockerfile` para contenerizar el microservicio.

7. **Configuración de Docker Compose**
   - Crear un archivo `docker-compose.yml` para orquestar el microservicio y MongoDB.

8. **Probar Localmente**
   - Levantar los servicios localmente usando Docker Compose.
   - Probar la funcionalidad del microservicio de productos.

### Fase 4: Despliegue en Google Cloud Platform (GCP)

9. **Configuración de GCP**
   - Configurar y autenticar el SDK de Google Cloud.
   - Crear un proyecto en GCP.
   - Habilitar Google Kubernetes Engine (GKE) y Google Cloud API Gateway.

10. **Construcción y Subida de Imágenes a GCR**
    - Construir la imagen de Docker para el microservicio.
    - Subir la imagen a Google Container Registry (GCR).

11. **Despliegue en GKE**
    - Crear un clúster en Google Kubernetes Engine (GKE).
    - Escribir archivos de configuración de Kubernetes (`Deployment`, `Service`) para el microservicio.
    - Desplegar los servicios en el clúster de GKE.

12. **Configuración de Google Cloud API Gateway**
    - Crear y configurar una API en Google Cloud API Gateway para enrutar las solicitudes al microservicio de productos.

### Fase 5: Configuración de CI/CD

13. **Automatización con Google Cloud Build**
    - Crear un archivo `cloudbuild.yaml` para definir los pasos de construcción y despliegue automatizados.

### Fase 6: Pruebas y Monitoreo

14. **Pruebas de Funcionalidad**
    - Realizar pruebas para asegurar que el microservicio funciona correctamente y puede ser accedido a través de Google Cloud API Gateway.

15. **Monitoreo y Logging**
    - Configurar Stackdriver en GCP para el monitoreo y logging del microservicio.
    - Establecer alertas para supervisar el estado y rendimiento del servicio.
