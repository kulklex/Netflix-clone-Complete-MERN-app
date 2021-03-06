const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")

dotenv.config();
app.use(bodyParser.json())
app.use(express.json())



//routers
const auth = require("./routes/auth")
const users = require("./routes/users")
const movies = require("./routes/movies")
const lists = require("./routes/lists")

app.use("/auth", auth)
app.use("/users", users)
app.use("/movies", movies)
app.use("/lists", lists)

const port = 7000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend server is running on port ${port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

