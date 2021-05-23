DROP DATABASE IF EXISTS company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

Insert into department(name) values('Sales');
Insert into department(name) values('Engineering');
Insert into department(name) values('Finance');
Insert into department(name) values('Legal');
Insert into department(name) values('Management');

Insert into role(title,salary,department_id) 
values('Sales Lead',100000,1);
Insert into role(title,salary,department_id) 
values('Salesperson',80000,1);
Insert into role(title,salary,department_id) 
values('Lead Engineer',150000,2);
Insert into role(title,salary,department_id) 
values('Software Engineer',120000,2);
Insert into role(title,salary,department_id) 
values('Accountant',125000,3);
Insert into role(title,salary,department_id) 
values('Legal Team Lead',250000,4);
Insert into role(title,salary,department_id) 
values('Lawyer',190000,4);
Insert into role(title,salary,department_id) 
values('Manager',300000,5);
Insert into employee(first_name,last_name,role_id) values('Tajinder','Goyal',8);
Insert into employee(first_name,last_name,role_id,manager_id) values('Gaurav','Sharma',8,1);
Insert into employee(first_name,last_name,role_id,manager_id) values('Sammy','Sharma',8,1);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('John','Doe',1,2);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Mike','Chan',2,2);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Ashley','Bowden',3,1);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Kevin','Brown',4,3);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Sarah','Bansal',5,1);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Sandy','Grang',6,3);
Insert into employee(first_name,last_name,role_id,manager_id) 
values('Raman','Bowden',7,2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
