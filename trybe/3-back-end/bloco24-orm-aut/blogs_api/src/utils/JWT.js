const jwt = require('jsonwebtoken');

const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
};

const TOKEN_SECRET = process.env.JWT_SECRET || 'secretJWT';

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

const tokenValidation = async (token) => {
    if (!token) return { error: { status: 401, message: 'Token not found' } };
    try {
        const introspection = await jwt.verify(token, TOKEN_SECRET);
        return introspection;
    } catch (err) {
        return { error: { status: 401, message: 'Expired or invalid token' } };
    }
};

module.exports = { generateToken, tokenValidation };