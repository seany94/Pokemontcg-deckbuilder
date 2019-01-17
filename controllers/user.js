module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  // let index = (request, response) => {
  //   response.render('home');
  // };

    let add = (request, response) => {
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
        db.pokemons.signInto(request, response, (error, user, success) => {
            response.render('home', {success});
      });
    };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    add,
    signCheck,
    signIn,
  };

}