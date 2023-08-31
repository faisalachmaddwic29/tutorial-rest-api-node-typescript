import { Router, type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/logger'

const HealthRouter = Router()

// localhost:4000/health
HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info('Health check success')
    res.status(200).send({ status: 200, message: 'Server is Running' })
})

export default HealthRouter
