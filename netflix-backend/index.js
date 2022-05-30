const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    () => {
        console.log("Connected to MongoDB")
    }
)
.catch(
    (err) => {
        console.error(err)
    }
)


const port = 8080
app.listen(port, () => {
    console(`Backend serveer is running on port ${port}`)
})