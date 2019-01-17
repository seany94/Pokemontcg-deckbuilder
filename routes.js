module.exports = (app, db) => {

  const pokemons = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */

  app.get('/', pokemons.index);
  app.get('/user/new', pokemons.newUser);
  app.get('/user/new', pokemons.newUser);
  app.post('/user/add', pokemons.addUser);
  app.get('/user/signin', pokemons.signCheck);
  app.post('/user/signin', pokemons.signIn);
  app.get('/user/signout', pokemons.signOut);
};