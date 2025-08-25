import jwt from 'jsonwebtoken'

const getSession = async (email, _id) => {
    return await jwt.sign({
        email,
        _id
    }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    })
}

export default getSession;