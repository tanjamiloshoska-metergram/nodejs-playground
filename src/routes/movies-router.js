const express = require("express");
const MoviesController = require("../controllers/movies-controller");

const router = express.Router();
router.use(express.json());

router.get("/", MoviesController.getAllMovies);

router.get("/:imbdID", MoviesController.getMovieById);

router.get("/data", MoviesController.getMoviesData);

router.post("/", MoviesController.addMovie);

router.put("/", MoviesController.updateMovie);

router.delete("/:imbdID", MoviesController.deleteMovie);

module.exports = router;
