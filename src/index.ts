import express, { type Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Application = express()
const port: number = 4000

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

routes(app)

app.listen(port, () => {
    logger.info(`Server is listening on Port ${port}`)
})
