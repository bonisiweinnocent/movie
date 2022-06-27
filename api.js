module.exports = function (app, db) {

    app.get('/api/test', function (req, res) {
        res.json({
            username: 'joe'
        });
    });
    db
    //search for movies
    //store faves in db
    app.get('/api/user', async function (req, res) {

        let user = await db.manyOrOne('select * from love_user');
        console.log(user);



        res.json({
            data: user
        })
    });

}
