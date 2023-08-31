import { type Request, type Response, type NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')
    if (!accessToken) {
        return next()
    }

    const token: any = verifyJwt(accessToken)
    if (token.decoded) {
        res.locals.user = token.decoded
        return next()
    }

    if (token.expired) {
        return next()
    }

    return next()
}

export default deserializedToken
