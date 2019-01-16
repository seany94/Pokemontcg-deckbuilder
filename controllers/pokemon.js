module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let index = (request, response) => {
        response.render('home');
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