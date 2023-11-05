// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("database", "username", "password", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // creates a new table for the user
// const User = sequelize.define("User", {
//   name: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//   },
// });

// module.exports = User;

const mysql = require("mysql2");

// creates a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "screwthisshitS9922756G@",
  database: "roombookingsys",
});

const User = pool.query(
  `
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)
`,
  (err, results) => {
    if (err) throw err;
    console.log("Table created successfully");
  }
);
