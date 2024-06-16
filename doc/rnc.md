# Consultar RNC

## Tabla de Contenido
- [WebService SOAP](#webservice-soap)
- [WebService HTTP](#webservice-http)
- [WebService HTTP V2](#webservice-http-v2)


## WebService SOAP
El WebService SOAP de la DGII permite realizar consultas estructuradas para obtener información fiscal sobre entidades registradas. A continuación se describe la estructura de la consulta y la respuesta que se puede esperar al utilizar este servicio.

### Endpoint
El endpoint para acceder al servicio SOAP es: [WSMovilDGII](https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx?wsdl)

### Ejemplo de Solicitud SOAP
A continuación se muestra un ejemplo de una solicitud SOAP para consultar información fiscal:

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetContribuyentes xmlns="http://dgii.gov.do/">
      <value>string</value>
      <patronBusqueda>int</patronBusqueda>
      <inicioFilas>int</inicioFilas>
      <filaFilas>int</filaFilas>
      <IMEI>string</IMEI>
    </GetContribuyentes>
  </soap:Body>
</soap:Envelope>
```

### Respuesta
La respuesta del servicio contiene información detallada sobre la entidad consultada. Un ejemplo de respuesta es el siguiente:
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetContribuyentesResponse xmlns="http://dgii.gov.do/">
      <GetContribuyentesResult>string</GetContribuyentesResult>
    </GetContribuyentesResponse>
  </soap:Body>
</soap:Envelope>
```

### Descripción de los Campos
- RNC: Registro Nacional de Contribuyentes. Ejemplo: 403012656
- nombre: Nombre oficial de la entidad registrada. Ejemplo: UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO
- nombre_comercial: Nombre comercial de la entidad. Ejemplo: UAFAM
- categoria: Categoría fiscal de la entidad. Ejemplo: 0
- regimen_pagos: Régimen de pagos de la entidad. Ejemplo: 2
- estado: Estado actual de la entidad en el registro fiscal. Ejemplo: 2

## Webservice HTTP
Este Web service nos brinda informacion mas detallada y menos ambigua, como el caso de estado que de obtener 2 pasamos a terner un string que refleja que el estado es **"Normal"**

### Endpoint
El endpoint para acceder al servicio HTTP es: [WebApps](https://dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx)

### Ejemplo de Solicitud 
Se inicializa un objeto AData que contiene los datos necesarios para la solicitud. Los valores de __VIEWSTATE y __EVENTVALIDATION se obtienen de la página web del servicio y se asignan a las propiedades correspondientes del objeto.

```js
const Data = {
	__EVENTTARGET: "",
	__EVENTARGUMENT: "",
	__VIEWSTATE: "",
	__EVENTVALIDATION: "",
	'ctl00$cphMain$txtRNCCedula': "",
	'ctl00$cphMain$txtRazonSocial': "",
	'ctl00$smMain': "ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC",
	'ctl00$cphMain$btnBuscarPorRNC': "Buscar",
	__ASYNCPOST: true
}; 

const viewState = "";
const eventValidation = "";

Data.__VIEWSTATE = viewState;
Data.__EVENTVALIDATION = eventValidation;
Data['ctl00$cphMain$txtRNCCedula'] = rnc;
const data = new URLSearchParams(Data);
const response = await fetch("https://dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
	},
	body: data
});
```
### Respuesta
La respuesta no es mas que la propia pagina html, la cual contiene una tabla con la informacion que requerimos.
**NOTA:** de hacer la pedicion filtrando por Nombre o Razon Social esta nos puede devolver mas de un registro

### Descripción de los Campos
- RNC: Registro Nacional de Contribuyentes. Ejemplo: 403-01265-6
- nombre: Nombre oficial de la entidad registrada. Ejemplo: UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO
- nombre_comercial: Nombre comercial de la entidad. Ejemplo: UAFAM
- categoria: Categoría fiscal de la entidad. Ejemplo: (puede estar vacío)
- regimen_pagos: Régimen de pagos de la entidad. Ejemplo: NORMAL
- estado: Estado actual de la entidad en el registro fiscal. Ejemplo: ACTIVO
- administracion_local: Administración local correspondiente. Ejemplo: ADM LOCAL LA VEGA
- actividad_economica: Actividad económica principal de la entidad. Ejemplo: ENSEÑANZA - UNIVERSITARIA EXCEPTO FORMACIÓN DE POSGRADO
1234567890

## Webservice HTTP V2
Este Web service es muy parecido al anterior pero este nos brinda informacion extra como si es Emisor de Facturas Electronicas, tiene licencia de venta de vehivulos de motor (licencia VHM)

### Endpoint
El endpoint para acceder al servicio HTTP es: [WebApps V2](https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx)

### Ejemplo de Solicitud 
Se inicializa un objeto AData que contiene los datos necesarios para la solicitud. Los valores de __VIEWSTATE y __EVENTVALIDATION se obtienen de la página web del servicio y se asignan a las propiedades correspondientes del objeto.

```js
const Data = {
	__EVENTTARGET: "ctl00$cphMain$btnBuscarPorRNC",
	__VIEWSTATEGENERATOR: "4F4BAA71",
	__EVENTARGUMENT: "",
	__VIEWSTATE: "",
	__EVENTVALIDATION: "",
	ctl00$cphMain$hidActiveTab: "",
	'ctl00$cphMain$txtRNCCedula': "",
	'ctl00$cphMain$txtRazonSocial': "",
	'ctl00$smMain': "ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC",
	'ctl00$cphMain$btnBuscarPorRNC': "Buscar",
	__ASYNCPOST: true
}; 

const viewState = "";
const eventValidation = "";

Data.__VIEWSTATE = viewState;
Data.__EVENTVALIDATION = eventValidation;
Data['ctl00$cphMain$txtRNCCedula'] = rnc;
const data = new URLSearchParams(Data);
const response = await fetch("https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
	},
	body: data
});
```

### Respuesta
La respuesta no es mas que la propia pagina html, la cual contiene una tabla con la informacion que requerimos.
**NOTA:** de hacer la pedicion filtrando por Nombre o Razon Social esta nos puede devolver mas de un registro

### Descripción de los Campos

- RNC: Registro Nacional de Contribuyentes. Ejemplo: 403-01265-6
- nombre: Nombre oficial de la entidad registrada. Ejemplo: UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO
- nombre_comercial: Nombre comercial de la entidad. Ejemplo: UAFAM
- categoria: Categoría fiscal de la entidad. Ejemplo: (puede estar vacío)
- regimen_pagos: Régimen de pagos de la entidad. Ejemplo: NORMAL
- estado: Estado actual de la entidad en el registro fiscal. Ejemplo: ACTIVO
- administracion_local: Administración local correspondiente. Ejemplo: ADM LOCAL LA VEGA
- actividad_economica: Actividad económica principal de la entidad. Ejemplo: ENSEÑANZA - UNIVERSITARIA EXCEPTO FORMACIÓN DE POSGRADO
- facturacion_electronica: Es Emisor Electronico. Ejemplo: 'NO'
- licencias_vhm: Tiene la Licencia de venta de Vehiculos de Motor. Ejemplo: 'N/A'