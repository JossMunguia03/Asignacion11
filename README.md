# 🌿 GratiDay API

API RESTful desarrollada con **Node.js**, **Express** y **MySQL**, que permite gestionar frases, categorías y usuarios dentro de la aplicación **GratiDay**, enfocada en compartir pensamientos positivos y reflexiones diarias.  
Incluye autenticación mediante **JWT (JSON Web Token)** y manejo de errores personalizado.

---

## 🚀 Características principales

- CRUD completo para usuarios, frases y categorías.  
- Autenticación mediante **JWT**.  
- Endpoints públicos y protegidos.  
- Middleware de manejo de errores y autenticación.  
- Base de datos relacional con **MySQL**.  
- Documentación de pruebas con **Postman**.

---

## 🧩 Tecnologías utilizadas

- **Node.js**  
- **Express.js**  
- **MySQL**  
- **Sequelize** (u ORM similar)  
- **JWT (jsonwebtoken)**  
- **dotenv**  
- **bcryptjs**  
- **Postman** (para pruebas)

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)  
- [MySQL](https://www.mysql.com/)  
- [Postman](https://www.postman.com/) (para pruebas)

---

## 🧱 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/GratiDay.git
   cd GratiDay

2. Instala las dependencias:

npm install

3. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=gratiday_db
JWT_SECRET=clave_secreta_segura

4. Importa el archivo SQL ubicado en:

/database/database.sql

5. (Opcional) Ejecuta el archivo seed.js para poblar las tablas con datos de prueba:

node seed.js

Este script insertará usuarios, frases y categorías iniciales para realizar pruebas en el entorno local.

▶️ Ejecución del servidor

Inicia el servidor en modo desarrollo:

npm run dev

o modo normal:

npm start

El servidor se ejecutará en:

http://localhost:3000/