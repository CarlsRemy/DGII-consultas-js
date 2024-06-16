const cheerio = require('cheerio');
const soap = require('soap');

const rncIsvalid = (rnc = "") => {
	const rncRegex = /^[0-9]{9,11}$/;
	return rncRegex.test(rnc);
}

const results = {
	RNC: "",
	nombre: "",
	nombre_comercial: "",
	categoria: "",
	regimen_pagos: "",
	estado: "",
}
/* WEB SERVICES SOAP */
const consultRNCBySOAP = (rnc = "") => {
	return new Promise(async (resolve, reject) => {
		if (!rncIsvalid(rnc)) {
			reject({ error: "RNC inválido" });
		}
		const url = 'https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx?wsdl';
		const params = {
			value: rnc,
			patronBusqueda: 0,
			inicioFilas: 0,
			filaFilas: 10,
			IMEI: '',
		};

		try {
			await soap.createClient(url, function (err, client) {
				if (err) {
					reject({ error: `Parametro Incorrecto ${err}` });
				}

				client.GetContribuyentes(params, function (err, result) {
					if (err) {
						reject({ error: `Parametro Incorrecto ${err}` });
					}
					let jsonResult = JSON.parse(result.GetContribuyentesResult);

					if (jsonResult !== null) {
						results.RNC = jsonResult.RGE_RUC;
						results.nombre = jsonResult.RGE_NOMBRE;
						results.nombre_comercial = jsonResult.NOMBRE_COMERCIAL;
						results.categoria = jsonResult.CATEGORIA;
						results.regimen_pagos = jsonResult.REGIMEN_PAGOS;
						results.estado = jsonResult.ESTATUS;
					}

					resolve(results);
				});
			});
		} catch (e) {
			reject({ error: `Ocurrio un Error: ${e}` });
		}
	});
}
/* API V1 */
const Api1_Url = "https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx";
const Api1_Data = {
	__EVENTTARGET: "",
	__EVENTARGUMENT: "",
	__VIEWSTATE: "",
	__EVENTVALIDATION: "",
	'ctl00$cphMain$txtRNCCedula': "",
	'ctl00$cphMain$txtRazonSocial': "",
	'ctl00$smMain': "ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC",
	'ctl00$cphMain$btnBuscarPorRNC': "Buscar",
	__ASYNCPOST: true
}

const consultRNC = (rnc = "") => {
	return new Promise(async (resolve, reject) => {
		rnc = rnc.toLowerCase();
		if (rnc == "rnc" && !rncIsvalid(value)) {
			reject({ error: "RNC inválido" });
		}

		const viewState = "/wEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYEAgEPDxYIHgRUZXh0ZR4IQ3NzQ2xhc3MFBWxhYmVsHgRfIVNCAgIeB1Zpc2libGVoZGQCBQ8WAh4Fc3R5bGUFDmRpc3BsYXk6QmxvY2s7FggCAQ8WAh8EBQ1kaXNwbGF5Ok5vbmU7ZAIDDxYCHwQFDWRpc3BsYXk6Tm9uZTtkAgUPPCsADwIADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50AgFkChAWBGYCAQIDAgQWBDwrAAUBABYCHgpIZWFkZXJUZXh0BQtDw6lkdWxhL1JOQzwrAAUBABYCHwcFFE5vbWJyZS9SYXrDs24gU29jaWFsPCsABQEAFgIfBwUKQ2F0ZWdvcsOtYTwrAAUBABYCHwcFEVLDqWdpbWVuIGRlIHBhZ29zFgRmZmZmFgJmD2QWFGYPDxYCHwNoZGQCAQ9kFgICAQ8PFgIfAAULMTAxLTA5MDA5LTFkZAICD2QWAgIBDw8WAh8ABSRCQU5DTyBERSBBSE9SUk8gWSBDUkVESVRPIENPTkZJU0EgU0FkZAIDD2QWAgIBDw8WAh8ABSFCQU5DTyBERSBBSE9SUk8gWSBDUkVESVRPIENPTkZJU0FkZAIED2QWAgIBDw8WAh8ABQIgIGRkAgUPZBYCAgEPDxYCHwAFBk5PUk1BTGRkAgYPZBYCAgEPDxYCHwAFBkFDVElWT2RkAgcPZBYCAgEPDxYCHwAFGkJBTkNPUyBERSBBSE9SUk8gWSBDUkVESVRPZGQCCA9kFgICAQ8PFgIfAAUNQURNIExPQ0FMIEdHQ2RkAgkPDxYCHwNoZGQCBw88KwANAQAPFgIfA2hkZBgCBR9jdGwwMCRjcGhNYWluJGd2QnVzY1Jhem9uU29jaWFsD2dkBSNjdGwwMCRjcGhNYWluJGR2RGF0b3NDb250cmlidXllbnRlcw8UKwAHZGRkZGQWAAIBZIGI98sEGGrNgByS2g+HEyPBgMHQ";
		const eventValidation = "/wEWBQKUv/jLBgLqq//bBAKC/r/9AwKhwMi7BAKKnIvVCSzstCk5uK/Cd02rMOBr/njOZhuq";

		Api1_Data.__VIEWSTATE = viewState;
		Api1_Data.__EVENTVALIDATION = eventValidation;
		Api1_Data['ctl00$cphMain$txtRNCCedula'] = rnc;

		const data = new URLSearchParams(Api1_Data);
		const response = await fetch(Api1_Url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
			},
			body: data
		});

		if (!response.ok) {
			reject({ error: `HTTP error! status: ${response.status}` });
		}

		const resText = await response.text();
		const results =  parseHTML(resText)
		resolve(results);
	});
}
						
const consultRNCBusinessName = (razonSocial = "") => {
	return new Promise(async (resolve, reject) => {
		razonSocial = razonSocial.toLowerCase();
		if (razonSocial == "" || typeof razonSocial != "string") {
			reject({ error: "Razon Social inválida" });
		}

		const viewState = "/wEPDwUKMTkxNDA2Nzc4Nw9kFgJmD2QWAgIBD2QWAgIDD2QWAmYPZBYCAgEPZBYEAgEPDxYIHgRUZXh0ZR4IQ3NzQ2xhc3MFBWxhYmVsHgRfIVNCAgIeB1Zpc2libGVoZGQCBQ8WAh4Fc3R5bGUFDmRpc3BsYXk6QmxvY2s7FggCAQ8WAh8EBQ1kaXNwbGF5Ok5vbmU7ZAIDDxYCHwQFDWRpc3BsYXk6Tm9uZTtkAgUPPCsADwIADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50AgFkChAWBGYCAQIDAgQWBDwrAAUBABYCHgpIZWFkZXJUZXh0BQtDw6lkdWxhL1JOQzwrAAUBABYCHwcFFE5vbWJyZS9SYXrDs24gU29jaWFsPCsABQEAFgIfBwUKQ2F0ZWdvcsOtYTwrAAUBABYCHwcFEVLDqWdpbWVuIGRlIHBhZ29zFgRmZmZmFgJmD2QWFGYPDxYCHwNoZGQCAQ9kFgICAQ8PFgIfAAULMTAxLTA5MDA5LTFkZAICD2QWAgIBDw8WAh8ABSRCQU5DTyBERSBBSE9SUk8gWSBDUkVESVRPIENPTkZJU0EgU0FkZAIDD2QWAgIBDw8WAh8ABSFCQU5DTyBERSBBSE9SUk8gWSBDUkVESVRPIENPTkZJU0FkZAIED2QWAgIBDw8WAh8ABQIgIGRkAgUPZBYCAgEPDxYCHwAFBk5PUk1BTGRkAgYPZBYCAgEPDxYCHwAFBkFDVElWT2RkAgcPZBYCAgEPDxYCHwAFGkJBTkNPUyBERSBBSE9SUk8gWSBDUkVESVRPZGQCCA9kFgICAQ8PFgIfAAUNQURNIExPQ0FMIEdHQ2RkAgkPDxYCHwNoZGQCBw88KwANAQAPFgIfA2hkZBgCBR9jdGwwMCRjcGhNYWluJGd2QnVzY1Jhem9uU29jaWFsD2dkBSNjdGwwMCRjcGhNYWluJGR2RGF0b3NDb250cmlidXllbnRlcw8UKwAHZGRkZGQWAAIBZIGI98sEGGrNgByS2g+HEyPBgMHQ";
		const eventValidation = "/wEWBQKUv/jLBgLqq//bBAKC/r/9AwKhwMi7BAKKnIvVCSzstCk5uK/Cd02rMOBr/njOZhuq";

		Api1_Data.__VIEWSTATE = viewState;
		Api1_Data.__EVENTVALIDATION = eventValidation;
		Api1_Data['ctl00$cphMain$txtRazonSocial'] = razonSocial;

		const data = new URLSearchParams(Api1_Data);
		const response = await fetch(Api1_Url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
			},
			body: data
		});

		if (!response.ok) {
			reject({ error: `HTTP error! status: ${response.status}` });
		}

		const resText = await response.text();
		const results =  parseRazonHTML(resText)
		resolve(results);
	});
}

const parseHTML = (html = "") => {
	const $ = cheerio.load(html);
	if ($) {
		let Elements = $("tr>td:nth-child(2)", "tbody")
		results.actividad_economica = "";
		results.administracion_local = "";

		Elements.each((i, elem) => {
			switch (i) {
				case 0: results.RNC = $(elem).text().trim(); break;
				case 1: results.nombre = $(elem).text().trim(); break;
				case 2: results.nombre_comercial = $(elem).text().trim(); break;
				case 3: results.categoria = $(elem).text().trim(); break;
				case 4: results.regimen_pagos = $(elem).text().trim(); break;
				case 5: results.estado = $(elem).text().trim(); break;
				case 6: results.actividad_economica = $(elem).text().trim(); break;
				case 7: results.administracion_local = $(elem).text().trim(); break;
			}
		});
	}
	return results;
}

const parseRazonHTML = (html = "")=>{
	results = [];

	const $ = cheerio.load(html);
	if ($) {
		let Elements = $("tr.TbRow", "tbody")
		Elements.each((i, row) => {
			const cells = $(row).find('td');
			let rows = {};
			cells.each((index, cell) => {
				const cellText = $(cell).text().trim();
				switch (index) {
					case 0: rows.RNC = cellText; break;
					case 1: rows.nombre = cellText; break;
					case 2: rows.nombre_comercial = cellText; break;
					case 3: rows.categoria = cellText; break;
					case 4: rows.regimen_pagos = cellText; break;
					case 5: rows.estado = cellText; break;
				}
			});

			results.push(rows);
		})

	}
	return results;
}

/** API V2 */
const Api2_Url = "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx";
const Api2_Data = {
	ctl00$smMain: "ctl00$cphMain$upBusqueda|ctl00$cphMain$btnBuscarPorRNC",
	__EVENTTARGET: "ctl00$cphMain$btnBuscarPorRNC",
	__VIEWSTATEGENERATOR: "4F4BAA71",
	__EVENTARGUMENT: "",
	__VIEWSTATE: "",
	__EVENTVALIDATION: "",
	ctl00$cphMain$txtRNCCedula: "",
	ctl00$cphMain$txtRazonSocial: "",
	ctl00$cphMain$hidActiveTab: "",
	__ASYNCPOST: true
}

const consultRNCV2 = (rnc = "") => {
	return new Promise(async (resolve, reject) => {
		rnc = rnc.toLowerCase();

		if (rnc == "rnc" && !rncIsvalid(value)) {
			reject({ error: "RNC inválido" });
		}

		const viewState = "cmJAurOULC9dG0bI8Oz0bAXSeuLRRkRr3zXxlLme0a01Xjet+nK7/2lHxlCV2b1fQW5KW2TzKWEEaRM8lXaTIvsB7P8P0sRWzojCm51iaZRNniwXmZU+/MhDuIt/ilnU7hbrkFQr+roUuVHtZyZA2pLsTKC256NftxcEto9TtS4DQ9noKFP66JeXt9LaGc3R4YcWlA3RedIetRLi5Jut4PnIp684jXn61DgpUzkm/dTJuWIUFe5fcApgy+l0dWPEd3TBuyJxXYMzH+7ilkzTGQif5e+LQmh9r2Rt1xzw30UL2kLlIhrd1Q0U3/GG2CjrJyy/ei03tCj9CZ1oK5BCaoW/JHS0/c4Smow6FOC9or15QJChQChXFOmvX9fpBZg91bVVEA=="
		const eventValidation = "CjLylaRlNSCrMI4OAlCzjSprgPSns7lo+1vND45LdQYi/ZQnHhGgHT2F4mfsEnqMFxfWMxnlyLFr3aSE6UXIr4u7kkouBQAtbsCWjO1SsnR/znmBtVODFxHV1pu/MAoBuv/rpJjYGY8v+yNfGdoTAozVlWr0UIHZ0ygM70NByQaLTCuWA90ftJbHpSY1rll2DdASHB8h9P/C8bzW5/3rHwdGYuE2cWboLwz02A2aBj8Myxe+dGWc1TaDDNf53JMHHFkqjq/ABbr+qH5PSvIlVxUJD1Y="

		Api2_Data.__VIEWSTATE = viewState;
		Api2_Data.__EVENTVALIDATION = eventValidation;
		Api2_Data['ctl00$cphMain$txtRNCCedula'] = rnc;

		const data = new URLSearchParams(Api2_Data);
		const response = await fetch(Api2_Url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
			},
			body: data
		});

		if (!response.ok) {
			reject({ error: `HTTP error! status: ${response.status}` });
		}

		const resText = await response.text();
		const results =  parseHTML2(resText)
		resolve(results);
	});
}

const consultRNCBusinessNameV2 = (razonSocial = "") => {
	return new Promise(async (resolve, reject) => {
		razonSocial = razonSocial.toLowerCase();
		if (razonSocial == "" || typeof razonSocial != "string") {
			reject({ error: "Razon Social inválida" });
		}

		const viewState = "cmJAurOULC9dG0bI8Oz0bAXSeuLRRkRr3zXxlLme0a01Xjet+nK7/2lHxlCV2b1fQW5KW2TzKWEEaRM8lXaTIvsB7P8P0sRWzojCm51iaZRNniwXmZU+/MhDuIt/ilnU7hbrkFQr+roUuVHtZyZA2pLsTKC256NftxcEto9TtS4DQ9noKFP66JeXt9LaGc3R4YcWlA3RedIetRLi5Jut4PnIp684jXn61DgpUzkm/dTJuWIUFe5fcApgy+l0dWPEd3TBuyJxXYMzH+7ilkzTGQif5e+LQmh9r2Rt1xzw30UL2kLlIhrd1Q0U3/GG2CjrJyy/ei03tCj9CZ1oK5BCaoW/JHS0/c4Smow6FOC9or15QJChQChXFOmvX9fpBZg91bVVEA=="
		const eventValidation = "CjLylaRlNSCrMI4OAlCzjSprgPSns7lo+1vND45LdQYi/ZQnHhGgHT2F4mfsEnqMFxfWMxnlyLFr3aSE6UXIr4u7kkouBQAtbsCWjO1SsnR/znmBtVODFxHV1pu/MAoBuv/rpJjYGY8v+yNfGdoTAozVlWr0UIHZ0ygM70NByQaLTCuWA90ftJbHpSY1rll2DdASHB8h9P/C8bzW5/3rHwdGYuE2cWboLwz02A2aBj8Myxe+dGWc1TaDDNf53JMHHFkqjq/ABbr+qH5PSvIlVxUJD1Y="

		Api2_Data.__VIEWSTATE = viewState;
		Api2_Data.__EVENTVALIDATION = eventValidation;
		Api2_Data['ctl00$cphMain$txtRazonSocial'] = razonSocial;

		const data = new URLSearchParams(Api2_Data);
		const response = await fetch(Api2_Url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36'
			},
			body: data
		});

		if (!response.ok) {
			reject({ error: `HTTP error! status: ${response.status}` });
		}

		const resText = await response.text();
		const results =  parseRazonHTML2(resText)
		resolve(results);
	});
}

const parseHTML2 = (html = "") => {
	const $ = cheerio.load(html);
	results.facturacion_electronica = "NO";
	results.licencias_vhm = "N/A";
	if ($) {
		let Elements = $("tr>td:nth-child(2)", "tbody")
		Elements.each((i, elem) => {
			switch (i) {
				case 0: results.RNC = $(elem).text().trim(); break;
				case 1: results.nombre = $(elem).text().trim(); break;
				case 2: results.nombre_comercial = $(elem).text().trim(); break;
				case 3: results.categoria = $(elem).text().trim(); break;
				case 4: results.regimen_pagos = $(elem).text().trim(); break;
				case 5: results.estado = $(elem).text().trim(); break;
				case 6: results.actividad_economica = $(elem).text().trim(); break;
				case 7: results.administracion_local = $(elem).text().trim(); break;
				case 8: results.facturacion_electronica = $(elem).text().trim(); break;
				case 9: results.licencias_vhm = $(elem).text().trim(); break;
			}
		});
	}
	return results;
}

const parseRazonHTML2 = (html = "")=>{
	results = [];

	const $ = cheerio.load(html);
	if ($) {
		let Elements = $("tr.TbRow", "tbody")
		Elements.each((i, row) => {
			const cells = $(row).find('td');
			let rows = {};
			cells.each((index, cell) => {
				const cellText = $(cell).text().trim();
				switch (index) {
					case 0: rows.RNC = cellText; break;
					case 1: rows.nombre = cellText; break;
					case 2: rows.nombre_comercial = cellText; break;
					case 3: rows.categoria = cellText; break;
					case 4: rows.regimen_pagos = cellText; break;
					case 5: rows.estado = cellText; break;
					case 6: rows.facturacion_electronica = cellText; break;
					case 7: rows.licencias_vhm = cellText; break;
				}
			});

			results.push(rows);
		})

	}
	return results;
}
module.exports = { consultRNCBySOAP, consultRNC, consultRNCBusinessName, consultRNCV2, consultRNCBusinessNameV2}