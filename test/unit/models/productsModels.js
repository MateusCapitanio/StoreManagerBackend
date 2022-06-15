const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/products');

const connection = require('../../../db');

describe('Validando testes do model "products"', () => {

    describe('Validando método GET', () => {

        describe('Quando não há produtos cadastrados', () => {
            before(() => {
                sinon.stub(connection, 'execute').resolves([[]])
            })
            after(() => {
                connection.execute.restore();
            })
    
            it('Retorna um array', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.be.an('array');
            })
            it('Retorna um array vazio caso não haja produtos', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.be.empty;
            })
        })

        describe('Quando há produtos adastrados', () => {
            before(() => {
                const product = {
                    id: 1,
                    name: "Martelo de Thor",
                    quantity: 10
                }
                sinon.stub(connection, 'execute').resolves([[product]]);
            })
            after(() => {
                connection.execute.restore();
            })

            it('Verifica se retorna um array', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.be.an('array');
            })
            it('Verifica se o array não está vazio', async () => {
                const [result] = await productModel.getAll();
                expect(result).to.not.be.empty;
            })
            it('Verifica se o item do array é um objeto', async () => {
                const [result] = await productModel.getAll();
                expect(result[0]).to.be.an('object');
            })
            it('Verifica se objeto tem as propriedades esperadas', async () => {
                const [result] = await productModel.getAll();
                expect(result[0]).to.include.all.keys('id', 'name', 'quantity');
            })
        })
    })

    describe('Validando método POST', () => {
        describe('Quando insere um produto no banco', () => {
            const product = {
                name: 'laço da verdade',
                quantity: 10
            }

            before(async () => {
                const execute = [{ insertId: 1}];
                sinon.stub(connection, 'execute').resolves(execute);
            })

            after(async () => {
                connection.execute.restore();
            })
            describe('Quando é inserido com sucesso', () => {
                it('Retorna um objeto', async () => {
                    const response = await productModel.create(product.name, product.quantity);
                    expect(response).to.be.an('object');
                })
                it('Verifica se o objeto enviado recebeu o "id"', async () => {
                    const response = await productModel.create(product.name, product.quantity);
                    expect(response).to.include.keys('id');
                })
            })

        })
    })

    describe('Validando método DELETE', () => {

        describe('Quando não há produtos cadastrados', () => {
            let executeSpy;
            
            beforeEach(() => {
                executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 0 }]]);
            });

            afterEach(() => {
                connection.execute.restore();
            });

            it('Verifica se está executando o "DELETE"',  async () => {
                await productModel.exclude(1);
                expect(executeSpy.callCount).to.be.equal(1);
                expect(executeSpy.getCalls()[0].firstArg).to.contain("DELETE");
            });
        })
    })
})