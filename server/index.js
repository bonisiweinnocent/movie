
const PgPromise = require("pg-promise")
const express = require('express');

const fs = require('fs');
require('dotenv').config()
  const cors = require('cors')
const file = require('../server/')

const { default: axios } = require('axios');
const app = express();
app.use(express.static('public'))





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/auth', auth); 
const PORT = process.env.PORT || 2012;

app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});