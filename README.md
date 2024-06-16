# DGII-consultas-js

Este repositorio contiene información detallada sobre las páginas web y servicios web (webservices) proporcionados por la Dirección General de Impuestos Internos (DGII) de la República Dominicana. Aquí encontrarás ejemplos y guías sobre cómo consumir estos servicios como APIs utilizando JavaScript.


## Contenido
- **Documentación de los servicios web de la DGII:** Descripción de los diferentes servicios disponibles y cómo acceder a ellos.
- **Guías de implementación en JavaScript:** Pasos detallados para consumir los servicios web de la DGII usando JavaScript, incluyendo ejemplos de código.
- **Ejemplos prácticos:** Código de muestra que muestra cómo realizar consultas específicas y manejar las respuestas de los servicios web.
- **Mejores prácticas:** Recomendaciones y mejores prácticas para trabajar con los servicios web de la DGII de manera eficiente y segura.
- [Consulta de RNC](./doc/rnc.md) 
- [Consulta de NCF](./doc/ncf.md)
- [Consulta de E-NCF](./doc/e-ncf.md) 

# Rutas de Consulta
El repositorio detalla tres rutas principales de consulta a los servicios de la DGII:

- Ruta SOAP: Proporciona un servicio basado en el protocolo SOAP para realizar consultas estructuradas y obtener datos fiscales.


- WebService #1: Un servicio web que permite realizar consultas utilizando métodos HTTP estándar.
- WebService #2: Otro servicio web que ofrece funcionalidades adicionales o complementarias para las consultas fiscales, como lo es la consulta de **E-NCF**

### Requisitos
- Node.js
- NPM (Node Package Manager)

## Instalación
Clona este repositorio:
```sh
git clone https://github.com/tu_usuario/DGII-consultas-js.git
```
Navega al directorio del proyecto:
```sh
cd DGII-consultas-js
```
Instala las dependencias necesarias:
```sh
npm install
```

## Contribuciones
¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor abre un issue o envía un pull request con tus mejoras.

### Licencia
Este proyecto está bajo la licencia **MIT**. Consulta el archivo LICENSE para más detalles.