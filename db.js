const pg = require('pg');
const pokemons = require('./models/user');
const url = require('url');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

//  //check to see if we have this heroku environment variable
// if( process.env.DATABASE_URL ){

//   //we need to take apart the url so we can set the appropriate configs

//   const params = url.parse(process.env.DATABASE_URL);
//   const auth = params.auth.split(':');

//   //make the configs object
//   var configs = {
//     user: auth[0],
//     password: auth[1],
//     host: params.hostname,
//     port: params.port,
//     database: params.pathname.split('/')[1],
//     ssl: true
//   };

// }else{

//   //otherwise we are on the local network
//   const configs = {
//     user: 'sean',
//     host: '127.0.0.1',
//     database: 'pokemon',
//     port: 5432,
//   };
// }

const configs = {
    user: 'sean',
    host: '127.0.0.1',
    database: 'pokemon',
    port: 5432,
  };

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  pokemons: pokemons(pool),


  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool:pool
};