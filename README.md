# API RESTful para Gestión de Usuarios y Comentarios
Kevin Vincent Loachamin Almeida - A00382106


Este proyecto es una API backend desarrollada con Node.js y TypeScript para la gestión de usuarios, comentarios y reacciones a comentarios. La aplicacion cuenta con funcionalidades CRUD, maneja autenticacion por token y utiliza un sistema de roles para el acceso a ciertas funcionalidades 

## Tabla de Contenidos
- Instalación
- Configuración
- Ejecución
- Endpoints
- Tecnologías Utilizadas
- Funcionalidades Implementadas
- Despliegue
- Pruebas
- Limitaciones y Dificultades

## Instalación

1. Clona este repositorio:
    ```bash
    git clone (https://github.com/KevinVincent016/NodeJS-BackEnd.git)
    cd NodeJS-BackEnd
    ```

## Configuración

1. El proyecto utiliza MongoDB, por ello requiere que se configure una cuenta de MongoBD con un cluster activo
2. El proyecto utiliza generacion de token JWT para la encriptacion de la contraseña de los usuarios, por ello se recomienda que se configure una JWT_SECRET propia

## Ejecución

Para iniciar el servidor en modo de desarrollo:

```bash
npx yarn dev
```

## Endpoints
En el apartado "Docs" se incluye un JSON de Postman que tiene pruebas en un entorno local de los endpoints, en el puede encontrar tambien una descripcion mas detallada de cada operacion.

### Gestión de Usuarios
- POST /api/users/login - Login de un usuario.
- POST /api/users/ - Crea un nuevo usuario (restringido solo al rol superadmin).
- GET /api/users/ - Obtiene la lista de usuarios registrados.
- GET /api/users/profile - Obtiene la informacion del usuario logeado.
- GET /api/users/:id - Obtiene la informacion de un usuario por su ID.
- PUT /api/users/:id - Modifica un usuario existente (restringido solo al rol superadmin).
- DELETE /api/users/:id - Eliminar un usuario (restringido solo al rol superadmin).

### Gestión de Comentarios y Respuestas
- POST /api/comments - Crea un nuevo comentario.
- POST /api/comments - Crea una respuesta a un comentario. (Debe indicarse el comentario al que responde por medio del atributo "parentID : id")
- GET /api/comments/:id - Obtiene el comentario con la ID especificada.
- GET /api/comments/:authorID - Obtiene los comentarios hechos por el autor indicado.
- GET /api/comments/replies/:id - Obtiene las respuestas del comentario indicado.
- PUT /api/comments/:id - Modifica el comentario indicado.
- DELETE /api/comments/:id - Elimina el comentario indicado.
  
### Gestión de Reacciones a Comentarios
- POST /api/reactions - Crea una reaccion a un comentario (Debe indicarse el comentario al que reacciona por medio del atributo "commentId : id").
- GET /api/reactions/reactions/:id - Obtiene las reacciones del comentario indicado.
- PUT /api/reactions/update/:id - Modifica la reaccion indicada (Debe indicarse el comentario donde esta la reaccion a modificar por medio del atributo "commentId : id").
- DELETE /api/reactions/:commentId/:reactionId - Elimina una reacción.


## Tecnologías Utilizadas
- Node.js: Entorno de ejecución para JavaScript en el servidor.
- TypeScript: Superconjunto de JavaScript que añade tipado estático.
- MongoDB: Base de datos NoSQL para la persistencia de datos.
- JWT: Para la autenticación y autorización segura de los usuarios.

## Funcionalidades Implementadas
- Autenticación y Autorización: Sistema de autenticación mediante JWT, con roles de usuario (superadmin, regular).
- Gestión de Usuarios: CRUD completo para usuarios, con restricciones basadas en roles.
- Gestión de Comentarios: CRUD completo para comentarios, incluyendo la funcionalidad de hilos de discusión.
- Reacciones a Comentarios: Sistema para que los usuarios reaccionen a los comentarios.

## Despliegue
Desplegado con Railway
`nodejs-backend-production-2067.up.railway.app`

## Pruebas
Se incluye un archivo JSON de Postman en el proyecto (NodeJS BackEnd.postman_collection.json) que contiene pruebas de cada una de las funcionalidades de la API.
Este archivo contiene todas las solicitudes y scripts de test utilizados para validar la funcionalidad de la API.

 
**Cómo importar el archivo de Postman**

1. Abre Postman.
2. Haz clic en "Import" en la parte superior izquierda.
3. Selecciona el archivo `/docs/NodeJS BackEnd.postman_collection.json` .
4. Ejecuta las pruebas desde la colección importada.



## Limitaciones y Dificultades
Encontre ciertas dificultades al momento de decidir si hacer tanto las respuestas como las reacciones embebidas o referenciadas, en el proyecto se uso ambos metodos, respuestas referenciadas y reacciones embebidas, el manejar las reacciones embebidas trajo complicaciones al momento de hacer las consultas.
