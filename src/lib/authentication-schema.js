const joi = require("joi");

const movieSchema = joi.object({
    Title: joi.string(),
    Runtime: joi.string().pattern(new RegExp('^[0-9]{1,} min')),
    imdbID: joi.string(),
});

module.exports = movieSchema;