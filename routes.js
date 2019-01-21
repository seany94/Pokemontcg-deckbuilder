module.exports = (app, db) => {

  const pokemons = require('./controllers/user')(db);


  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */

  app.get('/', pokemons.index);
  app.get('/user/new', pokemons.newUser);
  app.post('/user/add', pokemons.addUser);
  app.get('/user/signin', pokemons.signCheck);
  app.post('/user/signin', pokemons.signIn);
  app.get('/user/signout', pokemons.signOut);
  app.get('/user/deck', pokemons.deck);
  app.post('/user/deck', pokemons.newDeck);
  app.get('/profile', pokemons.profile);
  app.get('/users', pokemons.users);
  app.get('/users/:id', pokemons.userProfile);
  app.get('/users/deck/:name', pokemons.viewDeck);
  app.get('/profile/deck/edit/:name', pokemons.editDeck);
  app.put('/profile/deck/:name', pokemons.editedDeck);
  app.delete('/profile/deck/delete/:name', pokemons.deleteDeck);
  app.put('/profile/deck/:name/rating', pokemons.star);

};