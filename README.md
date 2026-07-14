# README.md
## Club Social y Deportivo Landing Page
### Información y Disciplinas

Este proyecto es una landing page para un club social y deportivo, donde se pueden encontrar información sobre la historia del club y las disciplinas que se practican en el mismo.

## Stack
* Frontend: React
* Backend: Node.js con Express
* Base de datos: MongoDB
* Autenticación: JWT

## Instalación
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Iniciar el servidor con `npm start`

## Docker
1. Construir la imagen con `docker build -t club-social-deportivo .`
2. Iniciar el contenedor con `docker run -p 5000:5000 club-social-deportivo`

## Endpoints
La API tiene los siguientes endpoints:
* **POST /api/auth/register**: registrar un nuevo usuario
* **POST /api/auth/login**: iniciar sesión
* **GET /api/information**: obtener información sobre el club (público)
* **GET /api/history**: obtener la historia del club (público)
* **GET /api/disciplines**: listar disciplinas practicadas en el club (público)
* **GET /api/disciplines/:id**: obtener disciplina por id (público)
* **POST /api/disciplines**: crear nueva disciplina (requiere autenticación)
* **PUT /api/disciplines/:id**: actualizar disciplina (requiere autenticación)
* **DELETE /api/disciplines/:id**: eliminar disciplina (requiere autenticación)

## Modelo Principal
El modelo principal es **Discipline**, con los siguientes campos:
* **name**: String
* **description**: String
* **history**: String

## Seguridad
La seguridad es un aspecto importante en este proyecto. Se utilizan las siguientes medidas de seguridad:
* **Autenticación con JWT**: se utiliza para proteger los endpoints que requieren autenticación
* **Validación de input**: se valida el input de los usuarios para prevenir ataques de inyección SQL y cross-site scripting (XSS)
* **Uso de HTTPS**: se utiliza para cifrar la comunicación entre el cliente y el servidor
* **Protección contra ataques de fuerza bruta**: se utiliza un sistema de bloqueo de IP para prevenir ataques de fuerza bruta

## Configuración
La configuración del proyecto se encuentra en el archivo `config.js`. Se pueden configurar los siguientes parámetros:
* **port**: el puerto en el que se ejecuta el servidor (por defecto, 5000)
* **mongoUri**: la URI de la base de datos de MongoDB (por defecto, se utiliza la variable de entorno `MONGO_URI`)