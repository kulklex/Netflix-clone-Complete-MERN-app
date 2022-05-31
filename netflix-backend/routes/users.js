const router = require("express").Router()
const {updateUser, deleteUser, getUser, getAllUsers, getUserStats} = require("../controllers/users")
const verify = require("../verifyToken")

router.put("/:id", verify, updateUser)
router.delete("/:id", verify, deleteUser)
router.get("/find/:id", getUser)
router.get("/?new=true", getAllUsers)
router.get("/stats", getUserStats)
module.exports = router