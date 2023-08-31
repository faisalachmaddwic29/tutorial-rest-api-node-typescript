import { logger } from './utils/logger'
import { createServer } from './utils/server'
// Connect Mongo DB
import './utils/connectDB'

const app = createServer()
const port: number = 4000

app.listen(port, () => {
    logger.info(`Server is listening on Port ${port}`)
})
