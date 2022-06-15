const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');

describe('Validando testes de sales "services"', () => {
    describe('Validando os dados do GET', () => {
        describe('Quando não há dados no banco', () => {
            before (() => {
                sinon.stub(salesService, 'getAllSales').resolves([])
            })
            after(() => {
                salesService.getAllSales.restore();
            })
    
            it('Retorna um array', async () => {
                const result = await salesService.getAllSales();
                expect(result).to.be.an('array');
            })
            it('Verifica se o array está vazio', async () => {
                const result = await salesService.getAllSales();
                expect(result).to.be.empty;
            })
        })
    
        describe('Quando há dados no banco', () => {
            const sale = {
                saleId: 1,
                date: "2022-05-31T23:55:41.000Z",
                productId: 2,
                quantity: 10
            }
            before (() => {
                sinon.stub(salesService, 'getAllSales').resolves([sale])
            })
            after(() => {
                salesService.getAllSales.restore();
            })
    
            it('Retorna um array', async () => {
                const resultado = await salesService.getAllSales();
                expect(resultado).to.be.an('array');
            })
            it('Verifica se o array não está vazio', async () => {
                const resultado = await salesService.getAllSales();
                expect(resultado).to.not.be.empty;
            })
            it('Verifica se o array possui objeto', async () => {
                const resultado = await salesService.getAllSales();
                expect(resultado[0]).to.be.an('object');
            })
            it('Verifica se o objeto possui as propriedades corretas', async () => {
                const resultado = await salesService.getAllSales();
                expect(resultado[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
            })
        })
    })
    describe('Validando os dados do PUT', () => {
        describe('Quando não é encontrado o dado', () => {
            let executeSpy;
            
            beforeEach(() => {
                executeSpy = sinon.stub(salesModel, 'update').resolves(false);
            });
    
            afterEach(() => {
                salesModel.update.restore();
            });
            it('Retorno "false"', async () => {
                const result = await salesService.updateSale(1, [{ productId: 2, quantity: 10 }]);
                // console.log(result)
                // expect(1+1).to.be.equal(2);
                expect(result).to.be.an('boolean');
                expect(result).to.be.equal(false);
                expect(executeSpy.callCount).to.be.equal(1);
            })
        })
    })
})