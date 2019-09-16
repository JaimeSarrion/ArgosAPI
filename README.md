

# ARGOS API

<img width=70% height=70% src="https://github.com/JaimeSarrion/ArgosAPI/blob/master/src/images/api.png">

**Introducción**

Esta API es una de las partes realizadas para el TFG realizado para la universidad de Alicante. Este proyecto cuenta con dos partes más, una applicación móvil y una parte de hardware. Aquí están los otros dos repositorios.

+ [Aplicación móvil](https://github.com/JaimeSarrion/ArgosApp)
+ [Hardware](https://github.com/JaimeSarrion/ArgosHardware)

## Prerrequisitos

- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- [Node](https://nodejs.org/es/download/)
- [MySQL](https://www.mysql.com/)


# Guia de instalación
Para la instalación de la API tenemos varias formas de ponerlo en marcha:

## Heroku
Si lo que queremos es poner en marcha la API en Heroku, lo primero que tenemos que hacer es descargar el código fuente, depués, hemos de hacer unas configuraciones previas:

+ Cambiamos la variable ```hostname= 'localhost' ``` por ```hostname= 'process.env.PORT' ```
+ Comentamos la parte de codigo que pone 'LOCAL' y descomentamos la parte de código que pone 'HEROKU'
+ Abrimos la consola, y nos posicionamos en la raiz del proyecto e introducimos:
  - ```git init```
  - Introducimos nuestra cuenta de heroku ```heroku login```
  - ``` heroku create ```
  - Subimos el proyecto a heroku ```git push heroku master```
  - Ahora sólo hemos de ponerle un ad-on para la base de datos
## Local

Para poner la API en funcionamiento de manera local, hemos de seguir los siguientes pasos:

- Creamos la BBDD de datos en el servidor que más nos guste.
- En el archivo database.js ponemos el usuario y la contraseña de la BBDD, así como el host que estemos utilizando
- Comentamos la parte de codigo que pone 'HEROKU' y descomentamos la parte de código que pone 'LOCAL'
- Nos vamos a la raiz del proyecto y tecleamos ```node server.js```

## BBDD

Este es el esquema que tiene la BBDD:

<img width=70% height=70% src="https://github.com/JaimeSarrion/ArgosAPI/blob/master/src/images/bbdd.png">

# Autores

- [Jaime Sarrión](www.linkedin.com/in/jaime-sarrion-sahuquillo)

# Licencias

Este proyecto está bajo la licencia GNU GPL v3 - revisa  [LICENSE](https://es.wikipedia.org/wiki/GNU_General_Public_License)  para ver más detalles.

