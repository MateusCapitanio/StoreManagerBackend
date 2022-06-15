const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/sales');

const connection = require('../../../db');

describe('Validando testes do model "sales"', () => {
    describe('Validando método GET', () => {
        describe('Quando não há sales cadastrados', () => {
            before(() => {
                sinon.stub(connection, 'execute').resolves([[]])
            })
            after(() => {
                connection.execute.restore();
            })

            it('Retorna um array', async () => {
                const [result] = await salesModel.getAll();
                expect(result).to.be.an('array');
            })
            it('Retorna um array vazio caso não haja produtos', async () => {
                const [result] = await salesModel.getAll();
                expect(result).to.be.empty;
            })
        })

        describe('Quando há sales cadastrados', () => {
            before(() => {
                const sale = {
                    saleId: 1,
                    date: "2022-05-31T19:21:46.000Z",
                    productId: 1,
                    quantity: 5
                }
                sinon.stub(connection, 'execute').resolves([[sale]])
            })
            after(() => {
                connection.execute.restore();
            })

            it('Retorna um array', async () => {
                const [result] = await salesModel.getAll();
                expect(result).to.be.an('array');
            })
            it('Retorna um array vazio caso não haja produtos', async () => {
                const [result] = await salesModel.getAll();
                expect(result).to.not.be.empty;
            })
            it('Verifica se o item do array é um objeto', async () => {
                const [result] = await salesModel.getAll();
                expect(result[0]).to.be.an('object');
            })
            it('Verifica se objeto tem as propriedades esperadas', async () => {
                const [result] = await salesModel.getAll();
                expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            })
        })
    })

    describe ('Validando método GET por ID', () => {
        describe('Quando não há dados cadastrados', () => {
            before(() => {
                sinon.stub(connection, 'execute').resolves([[]])
            })
            after(() => {
                connection.execute.restore();
            })
            it('Retorna um array', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result).to.be.an('array');
            })
            it('Retorna um array vazio caso não haja produtos', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result).to.be.empty;
            })
        })

        describe('Quando há sales cadastrados', () => {
            before(() => {
                const sale = {
                    saleId: 1,
                    date: "2022-05-31T19:21:46.000Z",
                    productId: 1,
                    quantity: 5
                }
                sinon.stub(connection, 'execute').resolves([[sale]])
            })
            after(() => {
                connection.execute.restore();
            })

            it('Retorna um array', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result).to.be.an('array');
            })
            it('Retorna um array vazio caso não haja produtos', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result).to.not.be.empty;
            })
            it('Verifica se o item do array é um objeto', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result[0]).to.be.an('object');
            })
            it('Verifica se objeto tem as propriedades esperadas', async () => {
                const [result] = await salesModel.getAll(1);
                expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            })
        })
    })
})