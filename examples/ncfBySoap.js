const soap = require('soap');

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

const consultNCFBySOAP = (rnc = "", ncf = "") => {
	return new Promise(async (resolve, reject) => {
		if (!rncIsvalid(rnc)) {
			reject({ error: "RNC inválido" });
		}

		if (!ncfIsvalid(ncf) && !encfIsvalid(ncf)) {
			reject({ error: "NCF inválido" });
		}

		const url = 'https://dgii.gov.do/wsMovilDGII/WSMovilDGII.asmx?wsdl';

		const params = {
			RNC: rnc,
			NCF: ncf,
			IMEI: '',
		};

		try {
			await soap.createClient(url, function (err, client) {
				if (err) {
					reject({ error: `Parametro Incorrecto ${err}` });
				}

				client.GetNCF(params, function (err, result) {
					if (err) {
						reject({ error: `Parametro Incorrecto ${err}` });
					}

					const jsonResult = JSON.parse(result.GetNCFResult);

					if (jsonResult !== null) {
						results.RNC = jsonResult.RNC;
						results.nombre = jsonResult.NOMBRE;
						results.comprobante = jsonResult.COMPROBANTE;
						results.NCF = jsonResult.NCF;
						results.estado = jsonResult.ESTADO;
						results.vigencia = jsonResult.FECHA_VIGENCIA;
					}

					resolve(results)
				});
			});
		} catch (e) {
			reject({ error: `Ocurrio un Error: ${e}` });
		}

	});
}

const consultNCF1 = await consultNCFBySOAP("401052611","B0100000258")
const consultNCF2 = await consultNCFBySOAP("403012656","B0100000258")

console.log(consultNCF1)
console.log(consultNCF2)