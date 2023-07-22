const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv");

function init() {
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
      console.log(response.action);
    });
}

init();
