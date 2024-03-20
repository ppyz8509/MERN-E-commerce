const jwt = require("jsonwebtoken")
const { model } = require("mongoose")
const verifyToken = ( req,res,next) => {
    if(!req.header.authorization){
        return res.status(401).send({ message : "Unauthorized Access"})
    }
    const token = req.header.authorization.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
        if(err){
            return res.status(401).send({message:"Unauthorized Access" })
        }
        req.decoded = decoded
        next()
    })
}
module.exports = verifyToken
