
const PgPromise = require("pg-promise")
const express = require('express');
// const axios = require('axios').default;
const fs = require('fs');

require('dotenv').config()
const cors = require('cors')
const file = require('../server/')
const auth = require('./router/auth')
// const movies = require('./router/movies')
const axios = require('axios');
const app = express();
app.use(express.static('public'))





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//app.use(axios())
app.use('/auth', auth);
// app.use('/movies', movies)
const PORT = process.env.PORT || 2012;
console.log('-');

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`)
});