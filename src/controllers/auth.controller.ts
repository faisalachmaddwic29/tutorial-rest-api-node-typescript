import { type Request, type Response } from 'express'
import { logger } from '../utils/logger'
import { onlyNumberAndString } from '../utils/regex'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { createUser, findUserByEmail } from '../services/auth.service'
import { checkPassword, hashing } from '../utils/hashing'
import { reIssueAccessToken, signJWT, verifyJwt } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
    req.body.user_id = uuidv4()

    const { error, value } = createUserValidation(req.body)

    if (error) {
        logger.error('Err = auth - register ', error.details[0].message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message.replace(onlyNumberAndString, ''),
            data: {}
        })
    }
    try {
        value.password = `${hashing(value.password)}`
        await createUser(value)

        logger.info({ data: req.body }, 'Success register user')

        res.status(201).send({
            status: true,
            statusCode: 201,
            message: 'Success register user',
            data: value
        })
    } catch (err) {
        logger.error('Err = auth - register ', err)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: err,
            data: {}
        })
    }
}

export const createSession = async (req: Request, res: Response) => {
    const { error, value } = createSessionValidation(req.body)

    if (error) {
        logger.error('Err = auth - create session ', error.details[0].message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message.replace(onlyNumberAndString, ''),
            data: {}
        })
    }

    try {
        const user: any = await findUserByEmail(value.email)
        const isValid = checkPassword(value.password, user.password)

        if (!isValid)
            return res.status(401).send({
                status: false,
                statusCode: 401,
                message: 'Invalid email or password'
            })

        const accessToken = signJWT({ ...user }, { expiresIn: '5s' })
        const refreshToken = await reIssueAccessToken(accessToken)

        return res.status(200).send({
            status: true,
            statusCode: 200,
            message: 'Success get User',
            data: { accessToken, refreshToken }
        })
    } catch (err: any) {
        logger.error('Err = auth - create session ', err.message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: err.message,
            data: {}
        })
    }
}

export const refreshSession = async (req: Request, res: Response) => {
    const { error, value }: any = refreshSessionValidation(req.body)

    if (error) {
        logger.error('Err = auth - refresh session ', error.details[0].message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message.replace(onlyNumberAndString, ''),
            data: {}
        })
    }

    try {
        const { valid, decoded }: any = verifyJwt(value.refresh_token)

        if (!valid) {
            return res.status(401).send({
                status: false,
                statusCode: 401,
                message: 'Maaf Token yang anda masukan Expired silahkan gunakan Refresh Token',
                data: {}
            })
        }

        const user = await findUserByEmail(decoded._doc.email)

        if (!user) return false

        const accessToken = signJWT(
            {
                ...user
            },
            { expiresIn: '1d' }
        )

        return res.status(200).send({
            status: true,
            statusCode: 200,
            message: 'Refresh Token Success',
            data: { accessToken }
        })
    } catch (err: any) {
        logger.error('Err = auth - refresh session ', err.message)
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: err.message,
            data: {}
        })
    }
}
