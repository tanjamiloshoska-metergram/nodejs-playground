const joi = require("joi");

const movieSchema = joi.object({
  ComingSoon: joi.boolean(),
  Title: joi.string(),
    Year: joi.string(),
    Rated: joi.string(),
    Released: joi.string(),
    Runtime: joi.string(),
    Genre: joi.array(),
    Director: joi.string(),
    Writer: joi.string(),
    Actors: joi.string(),
    Plot: joi.string(),
    Language: joi.string(),
    Country: joi.string(),
    Awards: joi.string(),
    Poster: joi.string(),
    Metascore: joi.string(),
    imdbRating: joi.string(),
    imdbVotes: joi.string(),
    imdbID: joi.string().required(),
    Type: joi.string(),
    totalSeasons: joi.string(),
    Response: joi.string(),
    Images: joi.array(),
});

module.exports = {
  movieSchema,
};
