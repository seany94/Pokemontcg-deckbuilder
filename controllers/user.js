module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   let cards = [];

    let index = (request, response) => {
        let cookie = request.cookies.loggedin;
        db.pokemons.home(response, cookie, (error, result, user) => {
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
        let cookie = request.cookies.loggedin;
        db.pokemons.profile(response, cookie, (error, result, user) => {
            response.render('profile', {profile:user, decks:result});
      });
    };

    let users = (request, response) => {
        db.pokemons.list((error, result) => {
            response.render('users', {result});
      });
    };

    let userProfile = (request, response) => {
        let id = request.params.id;
        let sort = request.query.sortby;
        db.pokemons.user(id, sort, (error, result, user) => {
            response.render('profile', {profile:user, decks:result});
      });
    };

    let deck = (request, response) => {
        let cookie = request.cookies.loggedin;
        db.pokemons.cards(response, cookie, (error, result, user) => {
            response.render('deck', {user});
      });
    }

    let newDeck = (request, response) => {
        let cookie = request.cookies.loggedin;
        let name = request.body.name;
        let card = request.body.card;
        db.pokemons.create(cookie, name, card, (error, result, name) => {
            response.render('newdeck', {cards:result, deck:name});
      });
    };

    let viewDeck = (request, response) => {
        let name = request.params.name;
        db.pokemons.view(name, (error, result, user, name) => {
            response.render('viewdeck', {cards:result, deck:name, user:user});
      });
    };

    let editDeck = (request, response) => {
        let cookie = request.cookies.loggedin;
        let name = request.params.name;
        db.pokemons.edit(response, cookie, name, (error, result, user, name) => {
            response.render('editdeck', {cards:result, deck:name, user:user});
      });
    };

    let editedDeck = (request, response) => {
        let cookie = request.cookies.loggedin;
        let name = request.params.name;
        let deckName = request.body.name;
        db.pokemons.edited(cookie, name, deckName, (error, result, user, name) => {
            // console.log(result)
            // response.render('viewdeck', {cards:result, deck:name, user:user});
            response.redirect('/profile')
      });
    };

    let deleteDeck = (request, response) => {
        let cookie = request.cookies.loggedin;
        let name = request.params.name;
        db.pokemons.del(response, cookie, name, (error, result) => {
            // response.render('viewdeck', {cards:result, deck:name, user:user});
            response.redirect('/profile')
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
    newDeck,
    viewDeck,
    editDeck,
    editedDeck,
    deleteDeck
  };

}