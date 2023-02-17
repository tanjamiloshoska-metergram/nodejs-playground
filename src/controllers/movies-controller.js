const movies = require("../services/movies-service");
const { wrap } = require("../lib/error-handler");
const { movieSchema } = require("../lib/authentication-schema");

const getAllMovies = wrap((req, res) => {
  return movies.getAllMovies(req.query);
});

const getMovieById = wrap((req, res) => {
  const id = req.params.imbdID;
  const movie = movies.getMovieById(id);

  if (!movie)
    return {
      status: "failed",
      message: "Movie not found",
    };

  return movie;
});

const getMoviesData = wrap((req, res) => {
  return movies.getMoviesData();
});

const addMovie = wrap((req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error)
    return {
      status: "failed",
      message: "Invalid format",
      details: error.details,
    };

  const movieById = movies.getMovieById(req.body["imdbID"]);
  if (movieById)
    return {
      status: "failed",
      message: "Movie already exists",
    };

  if (movies.addMovie(req.body)) {
    return {
      status: "sucess",
      message: "Movie added",
    };
  }

  return {
    status: "failed",
    message: "Something went wrong",
  };
});

const updateMovie = wrap((req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error)
    return {
      status: "failed",
      message: "Invalid format",
      details: error.details,
    };

  const movie = movies.getMovieById(req.body["imdbID"]);
  if (movie) {
    if (movies.updateMovie(req.body)) {
      return {
        status: "success",
        message: "Movie updated",
      };
    }
  } else if (movies.addMovie(req.body)) {
    return {
      status: "success",
      message: "Movie updated",
    };
  }

  return {
    status: "failed",
    message: "Something went wrong",
  };
});

const deleteMovie = wrap((req, res) => {
  const movieById = movies.getMovieById(req.params.imbdID);
  if (!movieById)
    return {
      status: "failed",
      message: "Movie not found",
    };

  if (movies.deleteMovie(req.params.imbdID)) {
    return {
      status: "success",
      message: "Movie deleted",
    };
  }

  return {
    status: "failed",
    message: "Something went wrong",
  };
});

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviesData,
  addMovie,
  updateMovie,
  deleteMovie,
};
