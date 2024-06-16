// test.ts
const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const { consultRNCBySOAP, consultRNC, consultRNCBusinessName, consultRNCV2, consultRNCBusinessNameV2 } = require("../src/rnc.js");

const mockResponse = {
	RNC: '403012656',
  nombre: 'UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO',
  nombre_comercial: 'UAFAM',
  categoria: '0',
  regimen_pagos: '2',
  estado: '2'
};

const mockResponse2 = {
  RNC: "403-01265-6",
  nombre: "UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO",
  nombre_comercial: "UAFAM",
  categoria: "",
  regimen_pagos: "NORMAL",
  estado: "ACTIVO",
  administracion_local: "ADM LOCAL LA VEGA",
  actividad_economica: "ENSEÑANZA UNIVERSITARIA EXCEPTO FORMACIÓN DE POSGRADO",
}

const mockResponse3 = {
  RNC: '403-01265-6',
  nombre: 'UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO',
  nombre_comercial: 'UAFAM',
  categoria: '',
  regimen_pagos: 'NORMAL',
  estado: 'ACTIVO',
  facturacion_electronica: 'NO',
  licencias_vhm: 'N/A',
  actividad_economica: 'ENSEÑANZA UNIVERSITARIA EXCEPTO FORMACIÓN DE POSGRADO',
  administracion_local: 'ADM LOCAL LA VEGA'
}


describe('consultRNCBySOAP', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const rnc = "403012656";
		const ncf = "B0100000258";
		await consultRNCBySOAP(rnc, ncf).then(result => {
			expect(result).to.deep.equal(mockResponse);
		})
	});
});

describe('consultRNC', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const rnc = "403012656";
		await consultRNC(rnc).then(result => {
			expect(result).to.deep.equal(mockResponse2);
		})
	});
});

describe('consultRNCBusinessName', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const razonSocial = "UNIVERSIDAD";
		/*await consultRNCBusinessName( razonSocial).then(result => {
			expect(result).to.deep.equal(mockResponse2);
		})*/
	});
});


describe('consultRNCV2', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const rnc = "403012656";
		await consultRNCV2(rnc).then(result => {
		  expect(result).to.deep.equal(mockResponse3);
		})
	});
});

describe('consultRNCBusinessNameV2', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const razonSocial = "UNIVERSIDAD";
		/*await consultRNCBusinessName( razonSocial).then(result => {
			expect(result).to.deep.equal(mockResponse2);
		})*/
	});
});