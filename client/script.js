
export default function authentication() {

    return {
        // init() {
        // },
    
        store: [],
        login: {
           
            username: "",
            password: ""
        
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
        
        registerUser() {
            fetch(`http://localhost:2012/auth/signup`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(this.signup)

            })
                .then(r => r.json())
                .then(usersData => {
                    console.log(usersData)
                    this.store = usersData.data
                    this.msg
                })
                .catch(e => console.log(e))

        },

        loginUser() {
            fetch(`http://localhost:2012/auth/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(this.login)

            })
                .then(r => r.json())
                .then(usersData => {
                    console.log(usersData);
                    // if(usersData.message == 'you have logged in') {
                        // this.show = true;
                        this.store = usersData.data
                        // this.message

                    // }
                })
                .catch(e => console.log(e))

        }

       

    }

}


