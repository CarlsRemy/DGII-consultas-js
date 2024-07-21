# Consulta de Ciudadanos

Esta peticion es bastante parecida a la de RNC, pero con la particulatidad que solo permite cedulas o RNC. En esta se muestran a las personas inscritas en el RNC como:  Propietario de Vehículos/Inmuebles, Empleado/Asalariado, Diplomático/Cónsul, Participación en Empresas, Sucesiones y Otras ocupaciones **(Algunas Cedulas No Aparecen)**.

### Endpoint
El endpoint para acceder al servicio HTTP es: [WebApp](https://dgii.gov.do/app/WebApps/ConsultasWeb/consultas/ciudadanos.aspx) y [WebApp V2](https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ciudadanos.aspx)


### Ejemplo de Solicitud 
Se inicializa un objeto AData que contiene los datos necesarios para la solicitud. Los valores de __VIEWSTATE y __EVENTVALIDATION se obtienen de la página web del servicio y se asignan a las propiedades correspondientes del objeto.


```js
const Data = {
	ctl00$smMain: "ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarCedula",
	ctl00$cphMain$txtCedula: "",
	__EVENTTARGET: "",
	__EVENTARGUMENT: "",
	__VIEWSTATE: "",
	__VIEWSTATEGENERATOR: "C8A53969",
	__EVENTVALIDATION: "",
	__ASYNCPOST: true,
	ctl00$cphMain$btnBuscarCedula: "Buscar"
	__ASYNCPOST: true
}; 

const viewState = "";
const eventValidation = "";

Data.__VIEWSTATE = viewState;
Data.__EVENTVALIDATION = eventValidation;
Data['ctl00$cphMain$txtCedula'] = rnc;
const data = new URLSearchParams(Data);
const response = await fetch("https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ciudadanos.aspx", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
	},
	body: data
});
```