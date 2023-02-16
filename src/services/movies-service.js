const fs = require("fs");
const CodeError = require("../lib/custom-error");

const path = "./movies.json"
const data = fs.readFileSync(path);
const movies = JSON.parse(data);

// Read

const getAllMovies = ({ genre, actor, imdbSort }) => {
  let filteredMovies = movies;
  if (genre) {
    filteredMovies = getMovieByGenre(genre, filteredMovies);
  }
  if (actor) {
    filteredMovies = getMovieByActor(actor, filteredMovies);
  }
  if (imdbSort) {
    filteredMovies = sortMoviesByRating(imdbSort, filteredMovies);
  }

  return filteredMovies;
};

const getMovieByGenre = (genre, newData) => {
  return newData.filter((movie) => movie.Genre.includes(genre));
};

const getMovieByActor = (actor, newData) => {
  return newData.filter((movie) => movie.Actors.includes(actor));
};

const sortMoviesByRating = (imdbSort, newData) => {
  if (imdbSort === "asc" || imdbSort === "ASC") {
    return newData.sort((a, b) => a.imdbRating - b.imdbRating);
  } else if (imdbSort === "desc" || imdbSort === "DESC") {
    return newData.sort((a, b) => b.imdbRating - a.imdbRating);
  }
};

const getMovieById = (id) => {
  return movies.find((movie) => movie.imdbID === id);
};

const getMoviesData = () => {
  return {
    totalLengthOfAllMovies: getLengthOfAllMovies(),
    imdbUrls: getImdbUrls(),
    totalImdbVotes: getTotalImdbVotes(),
    allLanguages: getAllLanguages(),
  };
};

const getLengthOfAllMovies = () => {
  return movies.reduce((totalLength, movie) => {
    const runtime = parseInt(movie.Runtime);
    !NaN(runtime) ? (totalLength += runtime) : totalLength;
  }, 0);
};

const getImdbUrls = () => {
  return movies.map((movie) => `https://www.imdb.com/title/${movie.imdbID}`);
};

const getTotalImdbVotes = () => {
  return movies.reduce((totalVotes, movie) => {
    const votes = parseInt(movie.imdbVotes.replace(/,/g, ""));
    !NaN(votes) ? (totalVotes += votes) : totalVotes;
  }, 0);
};

const getAllLanguages = () => {
  return movies.reduce((allLanguages, movie) => {
    const languages = movie.Language.split(",");
    languages.forEach((language) => {
      if (!allLanguages.includes(language)) {
        allLanguages.push(language);
      }
    });
    return allLanguages;
  }, []);
};

// Write

const writeToJsonFile = (newData) => {
  try {
    fs.writeFileSync(path, JSON.stringify(newData));
  } catch (err) {
    return false;
  }
  return true;
};

const addMovie = (movie) => {
  const movieById = getMovieById(movie.imdbID);
  if (movieById) throw new CodeError("Movie Already Exists", 400);

  movies.push(movie);

  if (writeToJsonFile(movies)) {
    return true;
  }

  throw new CodeError("Could Not Create Movie", 500);
};

const deleteMovie = (id) => {
  const movieIndex = movies.findIndex((movie) => movie.imdbID === id);
  if (movieIndex === -1) throw new CodeError("Movie Not Found", 404);

  movies.splice(movieIndex, 1);

  return writeToJsonFile(movies);
};

const updateMovie = (modifiedMovie) => {
  const movieIndex = movies.findIndex(
    (movie) => movie.imdbID === modifiedMovie.imdbID
  );
  movies[movieIndex] = modifiedMovie;

  if (writeToJsonFile(movies)) {
    return true;
  }

  throw new CodeError("Could Not Edit Movie", 500);
};

module.exports = {
  getAllMovies,
  getMovieByGenre,
  getMovieByActor,
  sortMoviesByRating,
  getMovieById,
  getMoviesData,
  addMovie,
  deleteMovie,
  updateMovie,
};
