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

  let user = (request, response, id, callback) => {
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

  let cards = (request, response, cookie, callback) => {
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
        response.render('deck');
    }
  };

  let create = (request, cookie, callback) => {

    dbPoolInstance.query(`SELECT id FROM users WHERE password = '${request.cookies.loggedin}'`, (error, queryResult) =>{
        let id = queryResult.rows[0].id;
        let name = request.body.name;
        dbPoolInstance.query(`INSERT INTO decks (name, author_id) VALUES ('${name}', ${id})`, (error, queryResult) =>{
            dbPoolInstance.query(`SELECT id FROM decks WHERE name = '${name}'`, (error, queryResult) =>{
                let deckId = queryResult.rows[0].id;
                let newQuery = '';
                for(let i = 0; i < request.body.card.length; i++){
                    let card = request.body.card[i];
                    newQuery += `INSERT INTO cards (card_id, deck_id) VALUES ('${card}', ${deckId});`
                }
                dbPoolInstance.query(newQuery, (error, queryResult) => {
                    dbPoolInstance.query(`SELECT * FROM cards WHERE deck_id = ${deckId};`, (error, queryResult) => {
                        if( error ){

                        // invoke callback function with results after query has executed
                        return callback(error, null, null);

                      }
                      else{
                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, name);
                      }
                    });
                });
            });
        });
    });
  };

  let view = (request, callback) => {
    let name = request.params.name;
    dbPoolInstance.query(`SELECT users.name FROM users INNER JOIN decks ON (users.id = author_id) WHERE decks.name = '${name}'`, (error, queryResult) =>{
        let user = queryResult.rows[0]
        dbPoolInstance.query(`SELECT card_id FROM cards INNER JOIN decks ON (deck_id = decks.id) WHERE name = '${name}'`, (error, queryResult) =>{
            if( error ){

            // invoke callback function with results after query has executed
                callback(error, null, null, null);

            }
            else{
            // invoke callback function with results after query has executed
                callback(null, queryResult.rows, user, name);
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
    user,
    cards,
    create,
    view
  };
};