import { type Request, type Response, type NextFunction } from 'express'

export const requiredUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
        return res.sendStatus(403)
    }

    return next()
}

export const requiredAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user || user._doc.role !== 'admin') {
        return res.sendStatus(403)
    }

    return next()
}
