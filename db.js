const pg = require('pg');
const pokemons = require('./models/user');
const url = require('url');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

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