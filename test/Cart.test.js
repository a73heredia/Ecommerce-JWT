import chai from 'chai';
import mongoose from 'mongoose';
import Cart from '../dao/cart.js';
import Product from '../dao/product.js'
import dotenv from 'dotenv';

const expect = chai.expect;
dotenv.config();

const MONGO_URI = process.env.MONGO_URI_TEST;

mongoose.connect(MONGO_URI);

describe('Pruebas al modulo Cart dao', function () {
    before(function() {
        console.log('Pruebas de Carritos');
    });

    
    beforeEach(async function() {
        mongoose.connection.collections.carts.drop();
   });

   after(() => {
});

afterEach(() => {});

it('Debe crear un carrito de forma exitosa', async function() {
    const cart = await Cart.createCart({products: []})

    expect(cart).to.be.have.property('_id');
    expect(cart).to.be.have.property('products');
    expect(Array.isArray(cart.products)).to.be.ok;
    expect(cart.products).to.be.deep.equal([]);
    
    
});

it('Debe obtener los carritos', async function() {
    const carts = await Cart.getCarts();
    // expect(carts).to.be.equal([])
    // expect(carts).to.have.lengthOf(0)
    expect(Array.isArray(carts)).to.be.equal(true)
    expect(Array.isArray(carts)).to.be.ok
});

it('Borrar un carrito de forma exitosa', async function() {
    const cart = await Cart.createCart({products: []})

    await Cart.deleteCartById(cart._id)
    
    
    expect(cart.products).to.have.lengthOf(0)
});



});
