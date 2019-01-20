const sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let home = (response, cookie, callback) => {
    if(cookie !== undefined){
        dbPoolInstance.query(`SELECT name FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
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

  let profile = (response, cookie, callback) => {
    if(cookie !== undefined){
        dbPoolInstance.query(`SELECT * FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
            let user = queryResult.rows;
            dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.password = '${cookie}')`, (error, queryResult) =>{
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

  let list = (callback) => {
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

  let user = (id, sort, callback) => {
    dbPoolInstance.query(`SELECT * FROM users WHERE id = '${id}'`, (error, queryResult) =>{
            let user = queryResult.rows;
            if(sort === 'datecr'){
                dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.id = '${id}') ORDER BY date_created ASC`, (error, queryResult) =>{
                    if( error ){

                        // invoke callback function with results after query has executed
                        callback(error, null, null);

                      }
                      else{

                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, user);
                      }
                })
            }
            else if(sort === 'dateup'){
                dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.id = '${id}') ORDER BY date_updated ASC`, (error, queryResult) =>{
                    if( error ){

                        // invoke callback function with results after query has executed
                        callback(error, null, null);

                      }
                      else{

                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, user);
                      }
                })
            }
            else if(sort === 'nameasc'){
                dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.id = '${id}') ORDER BY decks.name ASC`, (error, queryResult) =>{
                    if( error ){

                        // invoke callback function with results after query has executed
                        callback(error, null, null);

                      }
                      else{

                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, user);
                      }
                })
            }
            else if(sort === 'deckid'){
                dbPoolInstance.query(`SELECT decks.name FROM decks INNER JOIN users ON (users.id = author_id AND users.id = '${id}') ORDER BY decks.id ASC`, (error, queryResult) =>{
                    if( error ){

                        // invoke callback function with results after query has executed
                        callback(error, null, null);

                      }
                      else{

                        // invoke callback function with results after query has executed
                        callback(null, queryResult.rows, user);
                      }
                })
            }
            else{
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
            }
        })
  };

  let cards = (response, cookie, callback) => {
    if(cookie !== undefined){
        dbPoolInstance.query(`SELECT name FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
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

  let create = (cookie, name, card, callback) => {
    dbPoolInstance.query(`SELECT id FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
        let id = queryResult.rows[0].id;
        dbPoolInstance.query(`INSERT INTO decks (name, author_id) VALUES ('${name}', ${id})`, (error, queryResult) =>{
            dbPoolInstance.query(`SELECT id FROM decks WHERE name = '${name}'`, (error, queryResult) =>{
                let deckId = queryResult.rows[0].id;
                let newQuery = '';
                for(let i = 0; i < card.length; i++){
                    let cards = card[i];
                    newQuery += `INSERT INTO cards (card_id, deck_id) VALUES ('${cards}', ${deckId});`
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

  let view = (name, callback) => {
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

  let edit = (response, cookie, name, callback) => {
    if(cookie !== undefined){
        dbPoolInstance.query(`SELECT name, id FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
            let user = queryResult.rows[0].name;
            let id = queryResult.rows[0].id;
            dbPoolInstance.query(`SELECT author_id, card_id FROM cards INNER JOIN decks ON (deck_id = decks.id) WHERE name = '${name}'`, (error, queryResult) =>{
                if(queryResult.rows.length){
                    if(id === queryResult.rows[0].author_id){
                        if( error ){

                        // invoke callback function with results after query has executed
                            callback(error, null, null, null);

                        }
                        else{
                        // invoke callback function with results after query has executed
                            callback(null, queryResult.rows, user, name);
                        }
                    }
                    else{
                        response.redirect('/profile');
                    }
                }
                else{
                    response.redirect('/profile');
                }
            })
        })
    }
    else{
        response.redirect('/user/signin');
    }
  };

  let edited = (cookie, name, deckName, callback) => {
    dbPoolInstance.query(`SELECT name, id FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
        let user = queryResult.rows[0].name;
        dbPoolInstance.query(`UPDATE decks SET name = '${deckName}', date_updated = 'now()' WHERE name = '${name}'`, (error, queryResult) =>{
            console.log(queryResult.rows)

        // let newQuery = '';
        // for(let i = 0; i < request.body.card.length; i++){
        //     let card = request.body.card[i];
        //     newQuery += `UPDATE cards SET card_id = '${card}' WHERE author_id = ${id};`
        // }
        // dbPoolInstance.query(newQuery, (error, queryResult) =>{

            if( error ){

            // invoke callback function with results after query has executed
                callback(error, null, null, null);

            }
            else{
            // invoke callback function with results after query has executed
                callback(null, queryResult.rows, user, deckName);
            }
        })
    // })
    })
  };

  let del = (response, cookie, name, callback) => {
    if(cookie !== undefined){
        dbPoolInstance.query(`SELECT name, id FROM users WHERE password = '${cookie}'`, (error, queryResult) =>{
            let user = queryResult.rows[0].name;
            let id = queryResult.rows[0].id;
            dbPoolInstance.query(`SELECT author_id, card_id FROM cards INNER JOIN decks ON (deck_id = decks.id) WHERE name = '${name}'`, (error, queryResult) =>{
                if(queryResult.rows.length){
                    if(id === queryResult.rows[0].author_id){
                        let newQuery = `ALTER TABLE cards DROP CONSTRAINT IF EXISTS cards_deck_id_fkey; DELETE from decks WHERE name = '${name}'`;
                        dbPoolInstance.query(newQuery, (error, queryResult) =>{

                                if( error ){

                                // invoke callback function with results after query has executed
                                    callback(error, null);

                                }
                                else{
                                // invoke callback function with results after query has executed
                                    callback(null, queryResult.rows);
                                }
                        })
                    }
                    else{
                        response.redirect('/profile');
                    }
                }
                else{
                    response.redirect('/profile');
                }
            })

        })
    }
    else{
        response.redirect('/user/signin');
    }
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
    view,
    edit,
    edited,
    del
  };
};