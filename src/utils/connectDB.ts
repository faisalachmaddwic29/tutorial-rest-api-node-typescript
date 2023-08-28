import mongoose from 'mongoose'
import config from '../config/environtment'
import { logger } from './logger'

const url = `${config.db}`
logger.info(url)

mongoose
    .connect(url)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((err) => {
        logger.info('Could not connect to DB')
        logger.error(err)
        process.exit(1)
    })
