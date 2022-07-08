import axios from 'axios'
export default function authentication() {

    return {






        store: [],
        login: {

            username: "jsmith",
            password: "password"

        },
        show: false,
        msg: "You have successfully signed up!",
        message: "You are logged in!!",
        signup: {
            name: "",
            surname: "",
            username: "",
            password: ""

        },
        init() {
            this.showMovies()
            console.log(this.movies);
        },
        movies: [],
        msg: "Added to your favourites",

        movie_name: "",



        registerUser() {
            // let apiURL = this.url

            // console.log(this.signup, 'sign-up');
            axios
                .post(`http://localhost:2012/auth/signup`, this.signup)

                // .then(r => r.json())
                .then(usersData => {
                    console.log(usersData)
                    this.store = usersData.data
                })
                .catch(e => console.log(e))

        },

        signIn() {
            console.log('logging in', this.login)
            axios
            .post(`http://localhost:2012/auth/login`, this.login)

            // .then(r => r.json())
            .then(usersData => {
                console.log(usersData)
                this.store = usersData.data
                this.show = true
            })
            .catch(e => console.log(e))

        },
        showMovies() {
            axios
                .get(`http://api.themoviedb.org/3/discover/movie?api_key=7e719bfe3cd3786ebf0a05d3b138853d&sort_by=popularity.desc`)
                .then((result) => {


                    this.movies = result.data.results
                    console.log(this.movies);

                })
                .catch(err => {
                    console.log(err);
                })

        },

        addFavouriteMovie(movie) {
            const url = `http://localhost:2012/auth/playlist`

            axios
                .post(`${url}/${movie.id}`, {
                    // user_id: 25
                })
                .then((result) => {
                    console.log(result.data.results);
                    this.movies = result.data.results
                })

                .catch(err => {
                    console.log(err + "Is found here");
                })

        },
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

       logout(){
            // local storage - token
            this.show = false;
       },

        addFavouriteMovie(movie) {
            const url = `http://localhost:2012/auth/playlist`

            axios
                .post(`${url}/${movie.id}`, {
                    // user_id: 25
                })
                .then((result) => {
                    console.log(result.data.results);
                    this.movies = result.data.results
                })

                .catch(err => {
                    console.log(err + "Is found here");
                })

        },
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
        }



    }



}






