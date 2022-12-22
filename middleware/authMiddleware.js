const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler( async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //setting req.user
            req.user = await User.findById(decoded.id).select('-password')
            if(!req.user){
                res.status(400)
                throw new Error("User not found!")
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized!")
        }
    }

    if(!token){
        res.status(400)
        throw new Error("Not authorized!")
    }
})

module.exports = {protect}