module.exports = (app, db) => {

  const pokemons = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */

  app.post('/user/add', pokemons.add);
  app.get('/user/signin', pokemons.signCheck);
  app.post('/user/signin', pokemons.signIn);

};