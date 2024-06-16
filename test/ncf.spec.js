// test.ts
const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const {  consultNCFBySOAP, consultNCF } = require("../src/ncf.js");

const mockResponse = {
	RNC: '403012656',
	nombre: 'UNIVERSIDAD AGROFORESTAL FERNANDO ARTURO DE MERINO',
	comprobante: 'FACTURA DE CRÉDITO FISCAL',
	NCF: 'B0100000258',
	estado: 'VIGENTE',
	vigencia: '31/12/2025'
};

describe('consultNFCBySOAP', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const rnc = "403012656";
		const ncf = "B0100000258";
		await consultNCFBySOAP(rnc, ncf).then(result => {
			expect(result).to.deep.equal(mockResponse);
		})
	});
});

describe('consultNCF', () => {
	it(`debería devolver Object para un Comprobante Vigente`, async() => {
		const rnc = "403012656";
		const ncf = "B0100000258";
		await consultNCF(rnc, ncf).then(result => {
			
			expect(result).to.deep.equal(mockResponse);
		})
	});
});