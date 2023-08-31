import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import deserializedToken from '../middleware/deserializedToken'
import cors from 'cors'
import { routes } from '../routes'

export const createServer = () => {
    const app: Application = express()

    // app.use('/health', (req: Request, res: Response, next: NextFunction) => {
    //     res.status(200).send({ status: 200 })
    // })

    // parse body request
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    // Cors access handler
    app.use(cors())
    app.use((req, res, next) => {
        // semua dari sumber manapun bisa di terima
        res.setHeader('Access-Control-Allow-Origin', '*')
        // semua dari method manapun bisa di terima
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        next()
    })

    app.use(deserializedToken)

    routes(app)

    return app
}
