/* eslint-disable @typescript-eslint/no-unused-vars */
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { createServer } from '../utils/server'
import { addProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'


const app = createServer()

const productId1 = uuidv4();
const productId2 = uuidv4();

const userAdminCreated = {
    name : 'faisal',
    password : 'faisal',
    email: 'faisal@gmail.com',
    role: 'admin',
}

const userCreated = {
    name : 'tester',
    password : 'tester',
    email: 'tester@gmail.com'
}

const userAdmin = {
    email: 'faisal@gmail.com',
    password : 'faisal',
}

const userRegular = {
    email: 'tester@gmail.com',
    password : 'tester',
}


const productPayload = {
    product_id :productId1,
    name: "Faisal Test Kaos",
    price: 10000,
    size: "XL"
};

const productPayloadCreate = {
    product_id :productId2,
    name: "Faisal Test Kaos Baru",
    price: 10000,
    size: "XL"
};

describe('product', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
        await addProductFromDB(productPayload)

    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })


    describe('get all product', () => { 
        describe('given the product does exits', ()=> {
            it('it should return 200, and show all product', async() => {
                const {statusCode} = await supertest(app).get('/product').expect(200);

                expect(statusCode).toBe(200);
            })
        })
    });

    describe('get detail Product', () => {
        describe('given the product does not exits', () => {
            it('should return 404, and empty data', async () => {
                const productId = 'PRODUCT_123'

                await supertest(app).get(`/product/${productId}`).expect(404)
            })
        })
        describe('given the product does exits', () => {
            it('should return 200, and show detail product data', async () => {

                const {statusCode, body} = await supertest(app).get(`/product/${productId1}`);

                expect(statusCode).toBe(200);
                expect(body.data.name).toBe('Faisal Test Kaos');

            })
        })
    })


    describe('create product', () => {
        describe('if user it not login', () => {
            it('should return 403, Request Forbidden', async () => {
                const { statusCode } = await supertest(app).post('/product').send(productPayloadCreate);

                expect(statusCode).toBe(403);
            })
        })
        describe('if user has login', () => {
            it("should return 201, Request Success Create Product", async () => {
                const { statusCode } = await supertest(app).post('/product').send(productPayloadCreate);

                expect(statusCode).toBe(201);


            });
        });
    });
})
