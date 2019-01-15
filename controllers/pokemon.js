module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let index = (request, response) => {
    var name = request.params.name;
      db.pokemon.getAll(name,(error, allPokemon) => {
        response.render('home', { allPokemon });
      });
  };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index,
  };

}