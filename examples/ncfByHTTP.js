const cheerio = require('cheerio');

const rncIsvalid = (rnc = "") => {
	const rncRegex = /^[0-9]{9,11}$/;
	return rncRegex.test(rnc);
}

const ncfIsvalid = (ncf = "") => {
	const ncfRegex = /^B(?:0[1-4]{1}|1[1-7]{1})[0-9]{8}$/;
	return ncfRegex.test(ncf);
}

const results = {
	RNC: "", nombre: "", comprobante: "", NCF: "", estado: "VENCIDO", vigencia: "",
};

const consultNCF = async (rnc = "", ncf = "") => {
	return new Promise(async (resolve, reject) => {
		if (!rncIsvalid(rnc)) {
			reject({ error: "RNC inválido" });
		}

		if (!ncfIsvalid(ncf) && !encfIsvalid(ncf)) {
			reject({ error: "NCF inválido" });
		}

		const url = "https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx"
		const viewState = "pxnVanPQem/C/Zqg4vmdhAuTkdIPB8KP+q9AJ6Us4Oq0Mr1cJzPrCAuAE9G9c3hqm1kwACtIqN7ew5o5ImKFH4reFIvuBM23dZqMj/CxwktO+H2Td/f2LXmb6zYoIkuY7edLaUlsse9DDJZCstX4eNrKq0DmWQAjvrJcmz+K3hprNCtofctCr/C+tCHSoe5blSGl2E+1gcUqKdn4pKOEYuHUidFPfcX9k2UQWFJMDGnf2iTy4/rRnGgbWno4aNNfOkJx4N+JFTRLbp6oq/6yOujWheKYOZbvJ9usT5YedgeZZWsXP14ZEwaK92EIvtZZRmbwcsp4/+IfEABFEOtxgXEigg/nkHtxZ2v7z9mCc53NYklN+g1XrSKRdWdwzhpzgdZ0VSNSpekpr4ZEFUzivrA1kAIVkQYnesadrGsy4WMslqCSoZeUl8nU8dd0WtbxOTzE4E/nlJMk0TFDLTSGWospDG2GSjbTOkTyHrIv1t63ZyBZVqWJd5JS0W0VBGB+J6RNMf+VqKaYqYncsWLb4ehEka0=";
		const eventValidation = "w/vZnN4oakS1pbjmnlg6591RbWD3KHfEhCQHpjSAkrGa4R7+PQpfrikWM6vTMMm2KfCHSkIgct85BeyToMc7nvrq9kWAz1g47ZxqmYreUTvIVIp/x7Txq+aFEQffUyi6AjdU6Atza81kzZ4oEzRFyy6Qk4DdXUbMTaeUIay+1eyfFF3BmYRV4zpmFnE2/Iki0dHMVFKapjzmJKB5+AxVymP8P+UGIVjEdTtPFZaBqwCx2qan";

		const data = new URLSearchParams({
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
		});
		console.log(data.toString(), "j")

		try {
			const response = await fetch(url, {
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
			const results = parseHTML(resText);
			resolve(results);

		} catch (e) {
			reject({ error: `Ocurrio un Error: ${e}` });
		}
	});
}

const parseHTML = (html = "") => {
	const $ = cheerio.load(html);
	if ($) {
		$("td", "tbody").each((i, elem) => {
			switch (i) {
				case 0: results.RNC = $(elem).text().trim(); break;
				case 1: results.nombre = $(elem).text().trim(); break;
				case 2: results.comprobante = $(elem).text().trim(); break;
				case 3: results.NCF = $(elem).text().trim(); break;
				case 4: results.estado = $(elem).text().trim(); break;
				case 5: results.vigencia = $(elem).text().trim(); break;
			}
		});
	}
	return results;
}


const consultNCF1 = consultNCF("401052611","B0100000258")
const consultNCF2 = consultNCF("403012656","B0100000258")

console.log(consultNCF1)
console.log(consultNCF2)