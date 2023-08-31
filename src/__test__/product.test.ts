import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import '@types/jest'
import { createServer } from '../utils/server'

const app = createServer()

describe('product', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('get detail Product', () => {
        describe('given the product does not exits', () => {
            it('should return 404, and empty data', async () => {
                const productId = 'PRODUCT_123'

                await supertest(app).get(`/product/${productId}`).expect(404)
            })
        })
    })
})
