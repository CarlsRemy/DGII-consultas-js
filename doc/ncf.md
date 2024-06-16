# Consultar RNC

## Tabla de Contenido
- [WebService SOAP](#webservice-soap)
- [WebService HTTP](#webservice-http)

## WebService SOAP
El WebService SOAP de la DGII permite realizar consultas estructuradas para obtener información sobre un comprobante fiscal. A continuación se describe la estructura de la consulta y la respuesta que se puede esperar al utilizar este servicio.

### Endpoint
El endpoint para acceder al servicio SOAP es: [WSMovilDGII](https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx?wsdl)

### Ejemplo de Solicitud SOAP
A continuación se muestra un ejemplo de una solicitud SOAP para consultar información fiscal:

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetNCF xmlns="http://dgii.gov.do/">
      <RNC>string</RNC>
      <NCF>string</NCF>
      <IMEI>string</IMEI>
    </GetNCF>
  </soap:Body>
</soap:Envelope>
```

### Respuesta
La respuesta del servicio contiene información detallada sobre la entidad consultada. Un ejemplo de respuesta es el siguiente:
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetNCFResponse xmlns="http://dgii.gov.do/">
      <GetNCFResult>string</GetNCFResult>
    </GetNCFResponse>
  </soap:Body>
</soap:Envelope>
```


### Descripción de los Campos
- RNC: Registro Nacional de Contribuyentes. Ejemplo: 403012656
- nombre: Nombre oficial de la entidad registrada. Ejemplo: UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO
- comprobantecomercial: tipo de comprobante. Ejemplo: FACTURA DE CRÉDITO FISCAL
- NCF: numero de comprobante. Ejemplo: B0100000258
- vigencia: Fecha de vigencia. Ejemplo: 31/12/2025
- estado: Estado actual del comprobante. Ejemplo: VIGENTE


## WebService HTTP
El WebService HTTP de la DGII permite realizar consultas estructuradas para obtener información sobre un comprobante fiscal, este apenas y nos brinda algo diferente al **WebService SOAP** lo cual es validar [E-NCF](./e-ncf.md). A continuación se describe la estructura de la consulta y la respuesta que se puede esperar al utilizar este servicio.


### Endpoint
El endpoint para acceder al servicio HTTP es: [WebApps HTTP](https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx)

```js

	let eventValidation = "";
	let viewState = "";
	let rnc = ""
	let ncf = ""

	const Data = {
		ctl00$smMain: "ctl00$upMainMaster|ctl00$cphMain$btnConsultar",
		ctl00$cphMain$txtRNC: rnc,
		ctl00$cphMain$txtNCF: ncf,
		ctl00$cphMain$txtRncComprador: "",
		ctl00$cphMain$txtCodigoSeg: "",
		__EVENTTARGET: "",
		__EVENTARGUMENT: "",
		__VIEWSTATE: viewState,
		__VIEWSTATEGENERATOR: "43758EFE",
		__EVENTVALIDATION: eventValidation,
		__ASYNCPOST: true,
		ctl00$cphMain$btnConsultar: "Buscar"
	}

	const data = new URLSearchParams(Data);
	const response = await fetch("https://dgii.gov.do/app/WebApps/ConsultasWeb/consultas/ncf.aspx", {
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