const express = require('express');
const moviesRouter = require('./routes/movies-router');

const app = express();
const port=3000;

app.use(express.json());
app.use('/movies', moviesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

