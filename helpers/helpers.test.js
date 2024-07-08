const { sqlForPartialUpdate } = require("../helpers/sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
  test("works: valid input", () => {
    // Test case with valid data and jsToSql mapping
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" };
    
    // Call the function with valid inputs
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    
    // Check if the result matches the expected output
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32]
    });
  });

  test("works: no jsToSql mapping", () => {
    // Test case with valid data but without jsToSql mapping for fields
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = {};
    
    // Call the function with valid data and empty jsToSql
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    
    // Check if the result uses the original field names
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32]
    });
  });

  test("throws BadRequestError if no data", () => {
    // Test case with empty dataToUpdate object
    const dataToUpdate = {};
    const jsToSql = { firstName: "first_name" };
    
    // Call the function and expect it to throw a BadRequestError
    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });

  test("works: multiple mappings in jsToSql", () => {
    // Test case with multiple fields and corresponding jsToSql mappings
    const dataToUpdate = { firstName: "Aliya", age: 32, lastName: "Smith" };
    const jsToSql = { firstName: "first_name", lastName: "last_name" };
    
    // Call the function with multiple fields and mappings
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    
    // Check if the result matches the expected output with multiple mappings
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2, "last_name"=$3',
      values: ["Aliya", 32, "Smith"]
    });
  });
});
