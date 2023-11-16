## BackendTS-TodoApp

### Tecnologías utilizadas

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express-%2341B883.svg?style=for-the-badge&logo=express&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white) ![MySQL Workbench](https://img.shields.io/badge/mysql%20workbench-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

</div>

### Sobre el proyecto

Este proyecto consiste en desarrollar una API que brinde servicios de autenticación, registro y inicio de sesión para los usuarios. Además, ofrece operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar tareas almacenadas en una tabla de "Todos".

### Diagrama BD

!['diagram'](./public/images/diagram.png)

### Instalación en local

1. Clona el repositorio `$git clone 'url-repository'`
2. Instala las dependencias `npm install`
4. Ejecuta las migraciones y seeders `npm run migrations:run` `npm run seed`
5. Conectamos el servidor`npm run dev`

### Endpoints:

#### Autenticación

* POST - Registro
* POST - Login

#### Usuarios

* POST - Crear Todo.
* GET - Ver mis Todo's.
* PUT - Actualizar Todo's.
* DELETE - Borrar Todo.

#### Autor
Jorge Luis Martin Lorenzo.