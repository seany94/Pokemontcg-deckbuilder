module.exports = (app, db) => {

  const pokemons = require('./controllers/pokemon')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */

  //app.get('/pokemons', pokemons.index);
  app.get('/', pokemons.index);
};