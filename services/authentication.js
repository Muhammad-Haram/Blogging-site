const dotenv = require("dotenv");
dotenv.config();
const JWT = require('jsonwebtoken')

const secret = process.env.JWT_SEC;

function createTokenForUser(user) {

    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }

    const token = JWT.sign(payload, secret);
    return token;

}

function validateToken(token) {
    const payload = JWT.verify(token, secret)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}
