# cga_prueba_tecnica
Proyecto sugerido para prueba técnica de la empresa CGA tecnologies para optar al puesto de Desarrollador Front-end

# Pasos ejcutados

## 1. Creación del repositorio

Se creó un repositorio en Githhub en el siguiente [enlace](https://github.com/14DAVEN18/cga_prueba_tecnica)

## 2. Creación del proyecto de Angular

Se clonó el [repositorio](https://github.com/14DAVEN18/cga_prueba_tecnica) previamente mencionado y se creó un nuevo proyecto de Angular en la carpeta contenedora con el siguiente comando:

> ng new cga_prueba_tecnica

## 3. Instalación de Angular Material

Se instaló la librería de estilos [Angular Material](https://material.angular.io/) por medio del siguiente comando:

> ng add @angular/material

## 4. Estructura del proyecto

Se creó una carpeta "Components" para almacenar cada una de los diferentes componentes de la aplicación. Por ejemplo, el mapan, el menú de la parte superior y demás páginas desplegadas por medio de las demás opciones.

## 5. Creación de rutas para el Angular Router

En el archivo app.routes.ts se crean las rutas correspondientes a cada componente.

## 6. Insertar el snippet para Google Maps

Se insertó un script para mostrar un mapa de Google por medio del API de Google Maps
Se agregaron las coordenadas al mapa con los iconos de los pines asiganos acorde al vehiculo del vendedor
Se agrego un modal que es mostrado haciendo click en cualquier pin ubicado en el mapa.

## 7. Lista de vendedores

Se consumió el API de vendedores para traer los vendedores y mostrarlos en una lista