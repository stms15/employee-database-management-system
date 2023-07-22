const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./lib/view-functions");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "employee_db",
});

async function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
        name: "action",
      },
    ])
    .then((response) => {
      if (response.action === "View all departments") {
        viewAllDepartments(db);
      } else if (response.action === "View all roles") {
        viewAllRoles(db);
      } else if (response.action === "View all employees") {
        viewAllEmployees(db);
      }
    });
}

init();
