const { expect } = require('chai');
const res = require('express/lib/response');
const sinon = require('sinon');
const salesControl = require('../../../controllers/sales');
const salesService = require('../../../services/sales');

describe('Validando testes do sales "controller"', () => {
    describe('Validando método GET', () => {

        const returnExpected = [{
            saleId: 1,
            date: "2022-06-02T20:15:13.000Z",
            productId: 1,
            quantity: 5
        }]

        before(() => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(salesService, 'getAllSales').resolves(returnExpected);
        })
        after(() => {
            salesService.getAllSales.restore();
        })
        it('Verifica se é retornado o status 200', async () => {
            await salesControl.getSaleControl(res);

            expect(res.status.calledWith(200)).to.be.equal(true);
        })
        it('Verifica se o retorno é um array', async () => {
            const result = await salesService.getAllSales();

            expect(result).to.be.an('array');
        })
        it('Verifica se o primeiro item do array é um objeto', async () => {
            const result = await salesService.getAllSales();

            expect(result[0]).to.be.an('object');
        })
        it('Verifica se o objeto tem as propriedades esperadas', async () => {
            const result = await salesService.getAllSales();

            expect(result[0]).to.includes.all.keys('saleId', 'date', 'productId', 'quantity');
        })
    })
    describe('Verifica o método GET por "id"', () => {
        describe('Quando a requisição é um sucesso', () => {
            const req = {};
            const returnExpected = [{
                date: "2022-06-02T20:15:13.000Z",
                productId: 1,
                quantity: 5
            }]
    
            before(() => {
                req.params = { id: 1 }

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
    
                sinon.stub(salesService, 'getIdSale').resolves(returnExpected);
            })
            after(() => {
                salesService.getIdSale.restore();
            })
            it('Deve retornar 200', async () => {
                await salesControl.getSaleControlId(req, res)
    
                expect(res.status.calledWith(200)).to.be.true
            })
            it('Deve retornar um array ao passar o "id"', async () => {
                const result = await salesService.getIdSale(req.params.id)

                expect(result).to.be.an('array')
            })
            it('Deve retornar um array com um objeto na primeira posição', async () => {
                const result = await salesService.getIdSale(req.params.id);
                
                expect(result[0]).to.be.an('object')
            })
            it('Verifica se o objeto tem as propriedades esperadas', async () => {
                const result = await salesService.getIdSale(req.params.id);

                expect(result[0]).to.includes.all.keys('date', 'productId', 'quantity');
            })
        })
        describe('Quando a requisição falha', () => {
            const req = {};
    
            before(() => {
                req.params = { id: 1 }

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
    
                sinon.stub(salesService, 'getIdSale').resolves(false);
            })
            after(() => {
                salesService.getIdSale.restore();
            })
            it('Deve retornar 404', async () => {
                await salesControl.getSaleControlId(req, res)
    
                expect(res.status.calledWith(404)).to.be.true
            })
            
            it('Deve retornar "Sale not found" no erro', async () => {
                await salesService.getIdSale(req.params.id)

                expect(res.json.calledWith({ message: "Sale not found" })).to.be.equal(true);
            })
            // it('Deve retornar um array com um objeto na primeira posição', async () => {
            //     const result = await salesService.getIdSale(req.params.id);
                
            //     expect(result[0]).to.be.an('object')
            // })
            // it('Verifica se o objeto tem as propriedades esperadas', async () => {
            //     const result = await salesService.getIdSale(req.params.id);

            //     expect(result[0]).to.includes.all.keys('date', 'productId', 'quantity');
            // })
        })

    })
});

// describe('Validando método create', () => {
//     describe('Quando a requisição é inválida', () => {
//         const res = {};
//         const req = {};

//         before(() => {
//             req.body = {};

//             res.status = sinon.stub().returns(res);
//             res.send = sinon.stub().returns();

//             sinon.stub(productService, 'createProduct').resolves(false);
//         })
//         after(() => {
//             productService.createProduct.restore();
//         })

//         it("é chamado o status 400", async () => {
//             await productController.createProduct(req, res);
      
//             expect(response.status.calledWith(400)).to.be.equal(true);
//         });
//     })
// })