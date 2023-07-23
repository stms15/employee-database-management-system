const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Load all lib functions
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./lib/view-functions");

const {
  addingDepartmentApp,
  addingRoleApp,
  addingEmployeeApp,
  updatingEmployeeApp,
  deletingDepartmentApp,
  deletingRoleApp,
  deletingEmployeeApp,
} = require("./lib/apps");

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "employee_db",
});

// ------ Functions ------ //

async function processAction(action) {
  // Call action functions based on user input
  if (action === "View all departments") {
    viewAllDepartments(db);
  } else if (action === "View all roles") {
    viewAllRoles(db);
  } else if (action === "View all employees") {
    viewAllEmployees(db);
  } else if (action === "Add a department") {
    addingDepartmentApp(db);
  } else if (action === "Add a role") {
    addingRoleApp(db);
  } else if (action === "Add an employee") {
    addingEmployeeApp(db);
  } else if (action === "Update an employee role") {
    updatingEmployeeApp(db);
  } else if (action === "Remove a department") {
    deletingDepartmentApp(db);
  } else if (action === "Remove a role") {
    deletingRoleApp(db);
  } else if (action === "Remove an employee") {
    deletingEmployeeApp(db);
  } else {
    console.log(`Unrecognized action: ${action}`);
  }
}

// ----------------------- //

// --- Initalize function --- //

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
          "Remove a department",
          "Remove a role",
          "Remove an employee",
        ],
        name: "action",
      },
    ])
    .then((response) => {
      processAction(response.action);
    });
}

init();
