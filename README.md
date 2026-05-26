# Sistema de Gestión para Frutería

Este proyecto es una adaptación de una arquitectura Limpia/MVC (basado en el repositorio de veterinaria) para un sistema de ventas e inventario de una Frutería. Está desarrollado en **Node.js, Express y Prisma ORM**.

## Estructura del Proyecto

```
/
├── prisma/
│   └── schema.prisma       # Modelos de la BD (User, Fruit, Sale, SaleDetail)
├── src/
│   ├── controllers/        # Lógica de manejo de peticiones y respuestas
│   ├── middlewares/        # Middlewares (ej. Autenticación con JWT)
│   ├── routes/             # Definición de endpoints de la API
│   ├── services/           # Lógica de negocio (Interacción con Prisma)
│   └── index.js            # Punto de entrada de la aplicación
├── .env                    # Variables de entorno
└── package.json            # Dependencias
```

## Requisitos

- Node.js (v16+)
- NPM

## Instrucciones de Despliegue

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar la Base de Datos

Por defecto, el proyecto está configurado para utilizar **SQLite** para un inicio rápido.
Si deseas usar MySQL o PostgreSQL:
1. Abre el archivo `prisma/schema.prisma`.
2. Cambia el `provider` en la sección `datasource` de `"sqlite"` a `"mysql"` o `"postgresql"`.
3. En el archivo `.env`, actualiza el `DATABASE_URL` con tu cadena de conexión, por ejemplo:
   - MySQL: `mysql://USER:PASSWORD@HOST:PORT/DATABASE`
   - PostgreSQL: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`

### 3. Migrar la Base de Datos

Una vez configurada la URL de la base de datos, ejecuta la migración para crear las tablas:

```bash
npx prisma migrate dev --name init
```

### 4. Ejecutar el Servidor

Para iniciar el servidor en modo de desarrollo (usando nodemon):

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:3000`.

## Endpoints Principales

- **Autenticación:**
  - `POST /api/users/register`: Crear un usuario (Rol: ADMIN o CASHIER).
  - `POST /api/users/login`: Iniciar sesión (Retorna JWT).
- **Frutas (Inventario):**
  - `GET /api/fruits`: Listar frutas (Cajeros y Admins).
  - `POST /api/fruits`: Crear fruta (Solo Admins).
- **Ventas:**
  - `POST /api/sales`: Registrar una venta (Cajeros y Admins).
  - `GET /api/sales`: Ver historial de ventas (Solo Admins).
