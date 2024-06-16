# Consultar E-NCF

Esta peticion es bastante parecida a la de ncf, por lo cual debreria devolver un resultado parecido, al momenro de hacer esto pues non tengo ningun e-ncf asi que no lo puedo comprobar.

### Endpoint
El endpoint para acceder al servicio HTTP es: [WebApp](https://dgii.gov.do/app/WebApps/ConsultasWeb/consultas/ncf.aspx)

```js
let RncEmisor = ""
let eNCF = "";
let RncComprador = ""
let Codigo = ""

const viewState ="BDi18mDOL1bUK5dC9oI/wexFRZ6sJ8cQ1rGDZuz3cRR0ncVvosF4UYnOVaZOf3MGAfrdTlsLJSFmvSOfNZ8EJPAzCS+AHQdp1nsL62wuVEi24rvWrK8FYucl6e3v/gWjMXudLVabmez1UIe+psyaFbaeJ8nmgrkOO8DBdr+Zr8BUrtnLf7p6WlZACAcwd7ZjzwAKM/E111pXpJMmbnAe1CEelBvheWMUgxpLVrb1LN7tv5Pff99as76H+Szues3RAAY8vHnRlABBVL6rwpU7uU6ssT9JR1wv0CPgofAnuj8zWCEGeOipTUcg6fKDYXryYUi1WPQhXxdKmrit98WqFos2IuUejGXgsvl63wuttiWfL4mZtT7tpDKoCdHYCPSAOPghbg=="

const eventValidation = "5Wwoo/FA3lNIwnjt+/lho0CKvFoYrm8D85BcCz20cCotG7mzFodHye8y+yha/x4MD34uPPPN7kSwB8aNrDF/18DjxSMhqmdP9/T7quM81FAeCAyu+MiTc30IwyLEWYxVM2pBTL9dzC64cFUEHyyYlOdFsi9JYglPItCVG0T7B1N+WjBsBIZYPOtzw3LeF2CqSN8i9JGzBjPxjdk48Y+cC12hnqvv8RmJpaob0GW+jSHsLO5Z"

const Data = {
	ctl00$smMain: "ctl00$upMainMaster|ctl00$cphMain$btnConsultar",
	ctl00$cphMain$txtRNC: RncEmisor,
	ctl00$cphMain$txtNCF: eNCF,
	ctl00$cphMain$txtRncComprador: RncComprador,
	ctl00$cphMain$txtCodigoSeg: Codigo,
	__EVENTTARGET: "",
	__EVENTARGUMENT: "",
	__VIEWSTATE: viewState,
	__VIEWSTATEGENERATOR: "43758EFE",
	__EVENTVALIDATION: eventValidation,
	__ASYNCPOST: true,
	ctl00$cphMain$btnConsultar: "Buscar"
}
```