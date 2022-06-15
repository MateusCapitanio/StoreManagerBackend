const { expect } = require('chai');
const sinon = require('sinon');
const productControl = require('../../../controllers/products');
const productService = require('../../../services/products');

describe('Validando método create', () => {
    describe('Quando a requisição é inválida', () => {
        const res = {};
        const req = {};

        before(() => {
            req.body = {
                name: 'my name',
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(productService, 'getProducts').resolves([[{ name: 'name' }]]);
            sinon.stub(productService, 'createProduct').rejects(new Error('Bad request'));
        })
        after(() => {
            productService.getProducts.restore();
            productService.createProduct.restore();
        })

        it("é chamado o status 400", async () => {
            await productControl.postProductControl(req, res)
      
            expect(res.status.calledWith(400)).to.be.equal(true);
        });
        it('Verifica se o erro recebe "Bad request"', async () => {
            await productControl.postProductControl(req, res);
            
            expect(res.json.calledWith({ message: "Bad request" })).to.be.equal(true);
        });
    })
    describe('Quando a requisição é um sucesso', () => {
        const res = {};
        const req = {};

        before(() => {
            req.body = {
              name: "my name",
              quantity: 10
            };

            const returnObj = {
                id: 1,
                name: "my name",
                quantity: 10
            }
      
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            
            sinon.stub(productService, 'getProducts').resolves([[{ name: 'name' }]]);
            sinon.stub(productService, "createProduct").resolves(returnObj);
        });
        after(() => {
            productService.getProducts.restore();
            productService.createProduct.restore();
        });
        it("Chamado o status 201", async () => {
            await productControl.postProductControl(req, res);
      
            expect(res.status.calledWith(201)).to.be.equal(true);
        });
    })
})