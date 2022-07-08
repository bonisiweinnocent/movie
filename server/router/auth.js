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




router.post('/signup',
    async (req, res) => {
        try {

            console.log(req.body, 'SIGNUP');

            const { name, surname, username, password } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {

                return res.status(400).json({
                    errors: errors.array()
                })
            }

            let hashedPassword = await bcrypt.hash(password, 10);

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

                        }
                    ]
                })

            } else {

                await db.none(`insert into users(firstname,lastname,username,password) values ($1,$2, $3, $4)`, [name, surname, username, hashedPassword]);

                res.json({
                    "msg": "New user created!",
                    // token
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                message: error.message
            })
        }


    })


router.post('/login', async (req, res) => {
    try {
        console.log('Entering ...\n');
        const { username, password } = req.body;
        console.log('Login:', req.body);
        let user = await db.oneOrNone(`select * from users where username = $1`, [username]);
        console.log(user, 'user ...\n');

        if (!user) {
            throw Error("Oooops,looks like you're not registered!")
        }

        let matchPassword = await bcrypt.compare(password, user.password);
        console.log(matchPassword + "bdbdbdbdb");
        if (!matchPassword) {
            throw Error("Oooops,looks like you're not registered or wrong password!")
        }
        console.log('getting token');
        const token = await jwt.sign({
            username
        }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCK2jum", {
            expiresIn: 86400000
        })

        console.log({token});
        res.json({
            "msg": "you have logged in",
            token
        })

    } catch (error) {
        console.log(error.message)
        res.status(500)
            .json({
                message: error.message
            })
    }
})



router.post('/playlist/:favouriteMovie', async (req, res) => {
    const { favouriteMovie } = req.params;

    const { user_id } = req.body
    try {
        let isMovie = await db.oneOrNone(`select  * from user_playlist where movie_list = $1`, [favouriteMovie]);
        if (isMovie) {
            res.status(400).json({
                "errors": [
                    {
                        "msg": "Oooops,looks like you already have this movie!",

                    }
                ]
            })
        } else {

            await db.none(`insert into user_playlist(user_id,movie_list) values ($1,$2)`, [user_id, favouriteMovie]);

            res.json({
                "msg": "New movie created!",

            })
        }



    } catch (error) {
        console.log(error)
    }
})


module.exports = router

// }
