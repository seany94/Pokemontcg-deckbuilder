/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getAll = (name, callback) => {

    let query = `SELECT * FROM users WHERE name = '${name}'`;

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed
        callback(null, queryResult.rows);
      }
    });
  };

  return {
    getAll,
    //get,
  };
};