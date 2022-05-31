const User = require("../models/User")
const crypto = require("crypto-js") 
const jwt = require("jsonwebtoken")



//Registering a User
const registerUser = async (req, res) => {
 const newUser  = new User({
     username: req.body.username,
     email: req.body.email,
     password: crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
 })

 try {
    const user = await newUser.save()
    res.status(200).json(user)
 } catch (error) {
     res.status(500).json(error)
 }
}



//loggin in the user
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){res.status(404).json("Invalid Username or Password")}
        const bytes = crypto.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(crypto.enc.Utf8)
        if(originalPassword === req.body.password){
            const accessToken =jwt.sign(
                {id: user._id, isAdmin: user.isAdmin},
                process.env.SECRET_KEY,
                {expiresIn: "5d"}
            )
            
            const {password, ...userWithOutPassword} = user._doc;
            res.status(200).json({...userWithOutPassword, accessToken})
        } else {
            res.status(401).json("Invalid Username or Password")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {registerUser, loginUser}