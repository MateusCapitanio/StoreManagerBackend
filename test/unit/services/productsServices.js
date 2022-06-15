const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/products');
const productService = require('../../../services/products');

describe('Validando o método GET de product "services"', () => {
    describe('Quando não há dados no banco', async () => {
        before(() => {
            sinon.stub(productModel, 'getAll').resolves([]);
        });
        after(() => {
            productModel.getAll.restore();
        })

        it('Retorna um array', async () => {
            const resultado = await productModel.getAll();
            expect(resultado).to.be.an('array');
        })
        it('Verifica se o array está vazio', async () => {
            const resultado = await productModel.getAll();
            expect(resultado).to.be.empty;
        })
    })
    describe('Quando há dados no banco', async () => {
        const product = {
            id: 1,
            name: 'my product',
            quantity: 10
        };
        before(() => {
            sinon.stub(productModel, 'getAll').resolves([product]);
        });
        after(() => {
            productModel.getAll.restore();
        })

        it('Retorna um array', async () => {
            const resultado = await productModel.getAll();
            expect(resultado).to.be.an('array');
        })
        it('Verifica se o array está vazio', async () => {
            const resultado = await productModel.getAll();
            expect(resultado).to.not.be.empty;
        })
        it('Verifica se o array possui objeto', async () => {
            const resultado = await productModel.getAll();
            expect(resultado[0]).to.be.an('object');
        });
        it('Verifica se o objeto tem as propriedades corretas', async () => {
            const resultado = await productModel.getAll();
            expect(resultado[0]).to.include.all.keys('id', 'name', 'quantity');
        });
    })
})
describe('Validando método DELETE de product "services"', () => {
    let productId = 1;
    describe('Quando não há dados no banco', () => {
        let deleteById;

        beforeEach(() => {
            deleteById = sinon.stub(productModel, 'exclude').resolves(false)
        })
        afterEach(() => {
            productModel.exclude.restore();
        });

        it('Retorno "false" do delete', async () => {
            const resultado = await productService.excludeProduct(productId);
            expect(resultado).to.be.an('boolean');
            expect(resultado).to.be.equal(false);

            expect(deleteById.callCount).to.be.equal(1);
            expect(deleteById.getCalls()[0].args.length).to.be.equal(1);
            expect(deleteById.getCalls()[0].args[0]).to.be.an('number');
        })
    })
    describe('Quando há dados no banco', () => {
        let deleteById;

        beforeEach(() => {
            deleteById = sinon.stub(productModel, 'exclude').resolves(true);
        });

        afterEach(() => {
            productModel.exclude.restore();
        });
        it('Retorno "true" do delete', async () => {
            const result = await productService.excludeProduct(productId);
            expect(result).to.be.an('boolean');
            expect(result).to.be.equal(true);
        })
    })
})