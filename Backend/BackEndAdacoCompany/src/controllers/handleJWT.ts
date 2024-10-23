import * as jwt from 'jsonwebtoken'

const generateToken = (payload) => {
        // TODO : update code here, fix bug not load environment variable
        // const privateKey = process.env.privateKeyToken
        return jwt.sign(payload, '123456abc', {expiresIn: '1h'})
}

export { generateToken }