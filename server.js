const mysql = require('mysql');
const inquirer = require('inquirer');
const path = require("path");
require('dotenv').config({path : path.join(__dirname,"./.env")});
const cTable = require('console.table');

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
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;
        
        case 'Add Employee':
          addEmployee();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

function addDepartment() {
        inquirer
        .prompt([
          {
            name: 'dept',
            type: 'input',
            message: "What is the name of department you would like to add?",
          }
        ])
        .then(({dept}) => {
         connection.query('Insert into department set ?',
           {
             name : dept,
           }, (err, res) => {
             if (err) throw err;
             console.log("Department added sucessfully!");
             startApp();
            });
         });
};

function addRole  () {
  let dept =[];
  const query =
  'SELECT name FROM department';
  connection.query(query, (err, res) => {
  res.forEach(({name}) => {
        dept.push(name);
  });  
});
inquirer
.prompt([
  {
    name: 'titleEmp',
    type: 'input',
    message: "What is the title of the role?",
  },
  {
    name: 'salaryEmp',
    type: 'input',
    message: "What is the salary of the new role?",
  },
  {
    name: 'dept',
    type: 'rawlist',
    message: 'Which department the new role belongs to?',
    choices: dept,
  },
])
.then(({titleEmp,salaryEmp,dept}) => {
  let deptEmp ;
  let query = `select id from department where name = '${dept}'`;
  connection.query(query, (err, res) => {
      deptEmp = res[0].id;
         connection.query('Insert into role set ?',
           {
             title : titleEmp,
             salary : salaryEmp,
             department_id : deptEmp,
           }, (err, res) => {
             if (err) throw err;
             console.log("Role added sucessfully!");
             startApp();
            });
  });
})
};

function addEmployee() {
  let roles =[];
  let manager =[];
  const query1 =
  'SELECT id,title FROM role';
  connection.query(query1, (err, res) => {
  res.forEach(({title}) => {
        roles.push(title);
  });  
});
const query2 = 'select first_name from employee where role_id = (select id from role where title = "Manager")';
  connection.query(query2, (err, res) => {
  res.forEach(({first_name}) => {
        manager.push(first_name);
  });
  });
inquirer
.prompt([
  {
    name: 'firstName',
    type: 'input',
    message: "What is the Employee's first name?",
  },
  {
    name: 'lastName',
    type: 'input',
    message: "What is the Employee's last name?",
  },
  {
    name: 'role',
    type: 'rawlist',
    message: 'What is the role of the Employee?',
    choices: roles,
  },
  {
    name: 'manager',
    type: 'rawlist',
    message: 'Who is the manager of the Employee?',
    choices: manager,
  },
])
.then(({firstName,lastName,role,manager}) => {
  let roleEmp ;
  let query = `select id from role where title = '${role}'`;
  connection.query(query, (err, res) => {
      roleEmp = res[0].id;
      let managerEmp ;
       query = `select id from employee where first_name ='${manager}'`;
       connection.query(query, (err, res) => {
        if (err) throw err;
         managerEmp = res[0].id;
         connection.query('Insert into employee set ?',
           {
             first_name : firstName,
             last_name : lastName,
             role_Id : roleEmp,
             manager_id : managerEmp,
           }, (err, res) => {
             if (err) throw err;
             console.log("Employee added sucessfully!");
             startApp();
            });
  });
  }); 
})
};

function viewDepartments(){
  const query = 'SELECT name FROM department';
  connection.query(query, (err, res) => {
    console.table('Department Names',res);
    startApp();
  });
}


