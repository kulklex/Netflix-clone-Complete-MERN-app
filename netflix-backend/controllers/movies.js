const Movie = require("../models/Movie")

// create a movie(add a new movie to either dashboard or adminarea)
const addNewMovie = async (req, res) => {
    if (req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
}


//upload a movie( update movie from either dashboard or adminarea)
const updateMovie = async (req, res) => {
    if (req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
}

//delete a movie( delete a movie from either dashboard or adminarea)
const deleteMovie = async (req, res) => {
    if (req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("The movie hass been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
}


//get a single  movie( get a single movie from either dashboard or adminarea)
const getMovie = async (req, res) => {
        try {
          const movie =  await Movie.findById(req.params.id)
            res.status(200).json(movie)
        } catch (error) {
            res.status(500).json(error)
        }
}

//get a random movie( get a random movie from either dashboard or adminarea)
const getRandomMovie = async (req, res) => {
    const type = req.query.type
    try {
        let movie;
      if( type === "series"){
          movie = await Movie.aggregate([
              {$match: {isSeries: true}},
              {$sample: {size: 1}}
          ])
      } else {
        movie = await Movie.aggregate([
            {$match: {isSeries: false}},
            {$sample: {size: 1}}
        ])
      }
      res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
}


//get all movies( get all movies from either dashboard or adminarea)
const getAllMovies = async (req, res) => {
    if (req.user.isAdmin){
        try {
           const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
}


module.exports =  {getRandomMovie, getAllMovies, addNewMovie, updateMovie, deleteMovie, getMovie}