const router = require("express").Router()
const verify = require("../verifyToken")
const {addNewMovie, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies} = require("../controllers/movies")



router.post("/", verify, addNewMovie)
router.put("/:id", verify, updateMovie)
router.delete("/:id", verify, deleteMovie)
router.get("/find/:id", verify, getMovie)
router.get("/random", verify, getRandomMovie)
router.get("/all", verify, getAllMovies)

module.exports = router