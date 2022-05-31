const router = require("express").Router();
const {registerUser, loginUser} = require("../controllers/auth")



router.post("/register", registerUser)
router.get("/login", loginUser)


module.exports = router