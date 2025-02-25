
# Proyecto de API con Express y Mongoose
# Contenedores docker

Este proyecto utiliza Express para crear una API RESTful y Mongoose para interactuar con una base de datos MongoDB.
# README

Esta guía explica cómo ejecutar una aplicación con **Docker Compose**.

## Requisitos Previos
- Docker instalado y en ejecución.
- Docker Compose instalado (en muchos sistemas viene incluido con Docker Desktop).

---

## 1. Clonar el Repositorio

1. Abre tu terminal y navega hasta la carpeta deseada.
2. Ejecuta. Sustituye el usuario y el proyecto por el del repositorio:
   ```bash
   git clone https://github.com/alixiacf/U3_1.git
   ``` 
   
Entra en la carpeta del proyecto. Sustituye mi-proyecto por el nombre que tiene el repositorio:
   ```bash
cd mi-proyecto
   ``` 
### 2. Revisar docker-compose.yml
El archivo docker-compose.yml describe la configuración de tu aplicación y sus servicios. Por ejemplo:
   ```bash
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: mongo
    ports:
      - "27017:27017"
   ``` 
## 3. Desplegar la Aplicación
Desde la carpeta del proyecto, ejecuta:

   ```bash
         docker-compose up -d
   ``` 

-d levanta los contenedores en segundo plano.

Comprueba que todo esté corriendo:
   ```bash
docker-compose ps
   ``` 
(Opcional) Para ver los logs en tiempo real:
 ```bash
docker-compose logs -f
   ``` 

## 4. Uso de la Aplicación
Accede a la aplicación en http://localhost:8080 (o el puerto configurado).
Revisa la documentación o código fuente para conocer las rutas disponibles.

## 5. Configurar el usuario de acceso
docker exec -it MONBRE_DEL_CONTENEDOR mongosh -u root -p supersecreta --authenticationDatabase admin
 
use admin

db.createUser({
  user: "daw",
  pwd: "abc123.",
  roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"]
})

Nos devuelve {ok:1}

Volvemos a levantar con 
docker compose up 


## 6. Parar y Limpiar
Eliminamos los dockers con , redes y volúmenes
 ```bash
                 docker compose down -v 
   ```
Eliminamos todos los recursos no utilizados 
 ```bash
                 docker system prune --volumes -a
   ``` 
Verificamos todo el sistema
 ```bash
                 docker system df
                 docker volume prune -a -f

    ``` 
Test con 
https://github.com/jchook/stable-diffusion-webui-docker
https://github.com/ricardobalk/streamlit-ollama

## Authors

- [@alixiacf](https://www.github.com/alixiacf)

