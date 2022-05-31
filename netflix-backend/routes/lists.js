const verify = require("../verifyToken")
const router = require("express").Router()
const { createNewList, deleteList, getLists } = require("../controllers/lists")




router.post("/", verify, createNewList)
router.delete("/:id", verify, deleteList)
router.get("/", verify, getLists)










module.exports = router