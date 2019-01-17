const sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let signUp = (request, response, callback) => {
    dbPoolInstance.query("SELECT name FROM users", (error, queryResult) => {
        let validate = true;
        let queryName = queryResult.rows;
        let paramName = request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1);
        for(let i = 0; i < queryName.length; i++){
            if(paramName == queryName[i].name){
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

              }else{

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
                let hashCookie = sha256(user.name);
                response.cookie('loggedin', hashCookie);

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

  return {
    signUp,
    signInto,
  };
};