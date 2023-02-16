const movies = require("../services/movies-service");
const { wrap } = require("../lib/error-handler");
const movieSchema = require("../lib/authentication-schema");
const CodeError = require("../lib/custom-error");

const getAllMovies = wrap((req, res) => {
  return movies.getAllMovies(req.query);
});

const getMovieById = wrap((req, res) => {
  const id = req.params.imbdID;
  const movie = movies.getMovieById(id);

  if (!movie) throw new CodeError("Movie not found", 404);

  return movie;
});

const getMoviesData = wrap((req, res) => {
  return movies.getMoviesData();
});

const addMovie = (req, res) => {
  movies.addMovie(req.body);
  return {
    status: "created",
    data: movies.getMovieById(req.body.imbdID),
    path: `${req.baseUrl}/${req.body.imdbID}`,
  };
};

const updateMovie = wrap((req, res) => {
  const movie = movies.getMovieById(req.body.imbdID);
  if (movie) {
    movies.updateMovie(req.body);
    return {
      status: "updated",
      data: movies.getMovieById(req.body.imbdID),
      path: `${req.baseUrl}/${req.body.imdbID}`,
    };
  } else {
    movies.addMovie(req.body);
    return {
      status: "updated",
      data: movies.getMovieById(req.body.imbdID),
      path: `${req.baseUrl}/${req.body.imdbID}`,
    };
  }
});

const deleteMovie = wrap((req, res) => {
  movies.deleteMovie(req.params.imbdID);
  return {
    status: "deleted",
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
