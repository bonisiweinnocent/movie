// module.exports = function (app, db) {
const router = require("express").Router();
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const PgPromise = require('pg-promise');
const { Router } = require("express");

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);


// const BASE_URL = 'https://api.themoviedb.org/3'
// const API_KEY = '7e719bfe3cd3786ebf0a05d3b138853d&query'



router.post('/signup',
async (req, res) => {

    console.log(req.body);

    const { name, surname, username, password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({
            errors: errors.array()
        })
    }

    let hashedPassword = await bcrypt.hash(password,10);

    // *********
    let user = await db.oneOrNone(`select * from users where firstname =$1 and lastname =$2 and username =$3`, [name, surname, username]);
    console.log({ inside: user });
    const token = await jwt.sign({
        name
    }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCjum", {
        expiresIn: 86400000
    })
    if (user) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "This user already exists",
                    token
                }
            ]
        })
    } else {

        await db.none(`insert into users(firstname,lastname,username,password) values ($1,$2, $3, $4)`, [name, surname, username, hashedPassword]);

        res.json({
            "msg": "New user created!",
            token
        })
    }


})


router.post('/login', async (req, res) => {
    const { username, password} = req.body;
    let user = await db.oneOrNone(`select * from users where username = $1`, [username]);
    // console.log(user.passcode + "you arew");
    if (!user) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "Oooops,looks like you're not registered!",

                }
            ]
        })
    }

    let matchPassword = await bcrypt.compare(password,user.password);
    console.log(matchPassword + "bdbdbdbdb");
    if (!matchPassword) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "Oooops,looks like you're not registered!",
                    token
                }
            ]
        })
    }
    const token = await jwt.sign({
        username
    }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCK2jum", {
        expiresIn: 86400000
    })

    res.json({
        "msg": "you have logged in"
    })

})


module.exports = router

// }
