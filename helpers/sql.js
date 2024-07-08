const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.


/**
 * This function generates a SQL string for a partial update query and returns 
 * an object containing the SQL string and the values to be updated.
 * 
 * @param {Object} dataToUpdate - An object representing the fields and values to be updated. 
 *                                For example: {firstName: 'Aliya', age: 32}
 * @param {Object} jsToSql - An object that maps JavaScript field names to database column names. 
 *                           For example: { firstName: "first_name", age: "age" }
 * 
 * @returns {Object} - An object containing:
 *                     - `setCols`: A string of SQL set columns for the update query. 
 *                                   For example: '"first_name"=$1, "age"=$2'
 *                     - `values`: An array of values to be updated. 
 *                                 For example: ['Aliya', 32]
 * 
 * @throws {BadRequestError} - If no data is provided for updating.
 * 
 * @example
 * 
 * const dataToUpdate = { firstName: 'Aliya', age: 32 };
 * const jsToSql = { firstName: 'first_name' };
 * const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * // result = {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ['Aliya', 32]
 * // }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  // keys = ["firstName", "age"]
  if (keys.length === 0) throw new BadRequestError("No data");



  // The map function iterates over each key in the keys array and generates the corresponding SQL column assignment string.
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
