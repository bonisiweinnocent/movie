// module.exports = function (app, db) {
    const router = require("express").Router();
    const { check, validationResult } = require("express-validator")
    const bcrypt = require("bcrypt")
    // const { users } = require("../db")
    const jwt = require("jsonwebtoken")
    // const script = require('../../client/script')
    const PgPromise = require('pg-promise')
    
    const DATABASE_URL = process.env.DATABASE_URL;
    const pgp = PgPromise({});
    const db = pgp(DATABASE_URL);