module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   let cards = [];

    let index = (request, response) => {
        let cookie = request.cookies.loggedin
        db.pokemons.home(request, response, cookie, (error, result, user) => {
            response.render('home', {user});
      });
    };

    let newUser = (request, response) => {
        response.render('newuser');
    };

    let addUser = (request, response) => {
      db.pokemons.signUp(request, response, (error, user, values) => {
        response.render('useradd', {list:values});
      });
    };

    let signCheck = (request, response) => {
        if(request.cookies.loggedin !== undefined){
            response.render('signin', {list:['disabled']});
        }
        else{
            response.render('signin');
        }
    };

    let signIn = (request, response) => {
        db.pokemons.signInto(request, response, (error, result, user) => {
            response.render('home', {user});
      });
    };

    let signOut = (request, response) => {
        response.clearCookie('loggedin');

        response.redirect('/');
    };

    let profile = (request, response) => {
        let cookie = request.cookies.loggedin
        db.pokemons.profile(request, response, cookie, (error, result, user) => {
            response.render('profile', {profile:user, decks:result});
      });
    };

    let users = (request, response) => {
        db.pokemons.list(request, response, (error, result) => {
            response.render('users', {result});
      });
    };

    let userProfile = (request, response) => {
        let id = request.params.id;
        db.pokemons.users(request, response, id, (error, result, user) => {
            response.render('profile', {profile:user, decks:result});
      });
    };

    let deck = (request, response) => {
        let cookie = request.cookies.loggedin;
        db.pokemons.cards(request, response, cookie, (error, result, user) => {
            response.render('deck', {user});
      });
    }

    let newDeck = (request, response) => {
        let cookie = request.cookies.loggedin;
        db.pokemons.create(request, cookie, (error, result, name) => {
            response.render('newdeck', {cards:result, deck:name});
      });
    };
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index,
    newUser,
    addUser,
    signCheck,
    signIn,
    signOut,
    profile,
    users,
    userProfile,
    deck,
    newDeck
  };

}