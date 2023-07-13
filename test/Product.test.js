import mongoose from 'mongoose';
import Product from '../dao/product.js';
import Assert from 'assert';
import dotenv from 'dotenv';

const assert = Assert.strict;
dotenv.config();


const MONGO_URI = process.env.MONGO_URI_TEST;

const connection = mongoose.connect(MONGO_URI);

describe('Pruebas al modulo de productos dao', function() {
    before(async function() {
        console.log('Pruebas Productos');
    });

    beforeEach(async function() {
         mongoose.connection.collections.products.drop();
    });

    after('[after]', function() {
        console.log('Despues de todas las pruebas');
    });
    
    afterEach('[afterEach]',function(){
        console.log('Despues de cada prueba');
    });

    // it('debe traer los productos', async function() {
    //     const result = await Product.getProducts();
    //     console.log(result);
    // });

    it('Debe crear un producto', async function() {
        let result = await Product.createProduct({
            name: 'ale',
            price: 123,
            code: 'abc123',
            description: 'alejafdsf',
            stock: 4,
            status: 'available',
            category: 'ropa'
        });
        assert.ok(result._id);
        assert.strictEqual(result.name, 'ale')
    });

    it('debe retornar todos los productos', async function() {
        const result = await Product.getProducts();

        assert.strictEqual(Array.isArray(result), true);
        assert.deepStrictEqual(result, []);

    });

    it('Debe retornar todos los productos', async function() {
        const result = await Product.createProduct({
            name: 'ale',
            price: 123,
            code: 'abc123',
            description: 'alejafdsf',
            stock: 4,
            status: 'available',
            category: 'ropa'
        });
        const product = await Product.getProductById(result._id);
        //console.log(product);
        assert.strictEqual(typeof product, 'object');
        
    });

    it('Debe eliminar un producto por id', async function() {
        const result = await Product.createProduct({
            name: 'ale',
            price: 123,
            code: 'abc123',
            description: 'alejafdsf',
            stock: 4,
            status: 'available',
            category: 'ropa'
        });
         await Product.deleteProductById(result._id);
        
         //console.log(product);        
    });

    it('debe actualizar un producto por id', async function() {
        const result = await Product.createProduct({
            name: 'ale1',
            price: 121,
            code: 'abc121',
            description: 'alejafdsf1',
            stock: 41,
            status: 'available1',
            category: 'ropa1'
        });

        const data = {
            name: 'nuevo Producto',
            price: 22
        }

        await Product.updateProductById(result._id, data);

        const product = await  Product.getProductById(result._id);
        console.log(product);
         assert.ok(product._id);
         assert.strictEqual(typeof product, 'object');
         assert.strictEqual(product.name, data.name);
        
    });
} );