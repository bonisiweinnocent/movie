// searchForMovies =https://api.themoviedb.org/3/search/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&query=
// const app = require("express").Router();
// const PgPromise = require('pg-promise');



// const DATABASE_URL = process.env.DATABASE_URL;
// const pgp = PgPromise({});
// const db = pgp(DATABASE_URL);


// const BASE_URL = 'https://api.themoviedb.org/3'
// const API_KEY = '7e719bfe3cd3786ebf0a05d3b138853d&query'
// const image_base_url = 'https://image.tmdb.org/t/p/w1280'


// module.exports = app


import axios from 'axios'


export default function UserPlayList() {

    return {
        // init() {
        //    this.movieList()
        // },
        movies: [],

        movie_name: "",


        movieList() {
            const movieTopic = this.movie_name;
            axios
                .get(`http://api.themoviedb.org/3/search/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&query=${movieTopic}`)
                .then((result) => {

                    console.log(result.data.results);
                    this.movies = result.data.results

                })
                .catch(err => {
                    console.log(err);
                })
        },
        addFavouriteMovie(movie){
            console.log(movie)
        }

    }

}


