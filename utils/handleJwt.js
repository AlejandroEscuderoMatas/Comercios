const jwt           = require("jsonwebtoken")

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSignUser = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            //role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

const tokenSignCommerce = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            //role: user.role
        },
        process.env.JWT_SECRET,
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyTokenUser = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

const verifyTokenCommerce = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSignUser, tokenSignCommerce, verifyTokenUser, verifyTokenCommerce }