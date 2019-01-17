module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

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
  };

}