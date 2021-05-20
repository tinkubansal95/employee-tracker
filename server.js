const mysql = require('mysql');
const inquirer = require('inquirer');
const path = require("path");
require('dotenv').config({path : path.join(__dirname,"./.env")});

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Be sure to update with your own MySQL password!
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  startApp();
});

const startApp = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add Department',
        'Add Role',
        'Add Employee',
        'View Departments',
        'View Roles',
        'View All Employees',
        'View Employees by Manager',
        'View Employees by Department',
        'View the total utilized budget of a department',
        'Update Employee roles',
        "Update Employee's Manager",
        'Delete Department',
        'Delete Role',
        'Delete Employee'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add Department':
          artistSearch();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

