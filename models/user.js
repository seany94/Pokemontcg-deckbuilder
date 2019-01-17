const sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let home = (request, response, cookie, callback) => {
    if(request.cookies.loggedin !== undefined){
        dbPoolInstance.query(`SELECT name FROM users WHERE password = '${request.cookies.loggedin}'`, (error, queryResult) =>{
                if( error ){

                    // invoke callback function with results after query has executed
                    callback(error, null, null);

                  }
                  else{
                    const user = queryResult.rows[0];

                    user: [user.name]

                    // invoke callback function with results after query has executed
                    callback(null, queryResult.rows, user);
                  }
        })
    }
    else{
        response.render('home');
    }
  };

  let signUp = (request, response, callback) => {
    dbPoolInstance.query("SELECT name, username FROM users", (error, queryResult) => {
        let validate = true;
        let queryName = queryResult.rows;
        let paramName = request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1);
        let paramUserName = request.body.username;
        for(let i = 0; i < queryName.length; i++){
            if(paramName == queryName[i].name || paramUserName == queryName[i].username){
                validate = false;
            }
        }
        if(validate === false){
            response.redirect('/user/new');
        }
        else if(validate === true){
            const queryString = 'INSERT INTO users (name, photo_url, nationality, username, password) VALUES ($1, $2, $3, $4, $5)';
            const values = [
                request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
                request.body.photo,
                request.body.nat,
                request.body.username,
                sha256(request.body.password)
            ];
            dbPoolInstance.query(queryString, values, (error, queryResult) => {
              if( error ){

                // invoke callback function with results after query has executed
                callback(error, null, null);

              }
              else{

                // invoke callback function with results after query has executed
                callback(null, queryResult.rows, values);
              }
            });
        }
    });
  };

  let signInto = (request, response, callback) => {
    let queryString = `SELECT * FROM users WHERE username='${request.body.username}'`;

    dbPoolInstance.query(queryString, (error, queryResult) => {

        // if the user doesnt exist
        if(queryResult.rows.length === 0){
            response.render('signin', {list:['error']});
        }
        else{

            const user = queryResult.rows[0];

            let password = user.password;
            let inputPass = sha256(request.body.password)

            if(password == inputPass){
                response.cookie('loggedin', inputPass);

                dbPoolInstance.query(`SELECT id FROM users WHERE name = '${user.name}'`, (error, queryResult) =>{
                    if( error ){

                        // invoke callback function with results after query has executed
                        callback(error, null, null);

                    }
                    else{
                        user:[user.name]

                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, user);
                    }
                })
            }
            else{
                response.render('signin', {list:['error']});
            }
        }
    })
  };

  let profile = (request, response, cookie, callback) => {
    if(request.cookies.loggedin !== undefined){
        dbPoolInstance.query(`SELECT * FROM users WHERE password = '${request.cookies.loggedin}'`, (error, queryResult) =>{
            let user = queryResult.rows;
            dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.password = '${request.cookies.loggedin}')`, (error, queryResult) =>{
                if( error ){

                    // invoke callback function with results after query has executed
                    callback(error, null, null);

                  }
                  else{

                    // invoke callback function with results after query has executed
                    callback(null, queryResult.rows, user);
                  }
            })
        })
    }
    else{
        response.render('profile');
    }
  };

  let list = (request, response, callback) => {
    dbPoolInstance.query("SELECT * FROM users ORDER BY name ASC", (error, queryResult) =>{
        if( error ){

        // invoke callback function with results after query has executed
            callback(error, null, null);

        }
        else{

        // invoke callback function with results after query has executed
            callback(null, queryResult.rows);
        }
    })
  };

  let users = (request, response, id, callback) => {
    dbPoolInstance.query(`SELECT * FROM users WHERE id = '${id}'`, (error, queryResult) =>{
            let user = queryResult.rows;
            dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.id = '${id}')`, (error, queryResult) =>{
                if( error ){

                    // invoke callback function with results after query has executed
                    callback(error, null, null);

                  }
                  else{

                    // invoke callback function with results after query has executed
                    callback(null, queryResult.rows, user);
                  }
            })
        })
  };

  return {
    home,
    signUp,
    signInto,
    profile,
    list,
    users
  };
};