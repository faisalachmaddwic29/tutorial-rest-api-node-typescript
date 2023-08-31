import jwt from 'jsonwebtoken'
import CONFIG from '../config/environtment'
import { findUserByEmail } from '../services/auth.service'

export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(payload, CONFIG.jwt_private, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJwt = (token: string) => {
    try {
        const decode = jwt.verify(token, CONFIG.jwt_public)

        return {
            valid: true,
            expired: false,
            decoded: decode
        }
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === 'jwt is expired or not eligiable to use ',
            decoded: null
        }
    }
}

export const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded }: any = verifyJwt(refreshToken)
    const user = await findUserByEmail(decoded._doc.email)

    if (!user) return false

    const accessToken = signJWT(
        {
            ...user
        },
        { expiresIn: '1y' }
    )

    return accessToken
}
