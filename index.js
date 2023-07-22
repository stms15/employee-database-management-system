const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Load action functions
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./lib/view-functions");
const { addDepartment, addRole, addEmployee } = require("./lib/add-functions");
// Load info request functions
const {
  getDepartmentInfo,
  getRoleInfo,
  getEmployeeInfo,
} = require("./lib/get-table-info");
// Load update functions
const updateEmployee = require("./lib/update-employee-info");

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: "employee_db",
});

// Initalize app function
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
    .then(async (response) => {
      // Call action functions based on user input
      if (response.action === "View all departments") {
        viewAllDepartments(db);
      } else if (response.action === "View all roles") {
        viewAllRoles(db);
      } else if (response.action === "View all employees") {
        viewAllEmployees(db);
      } else if (response.action === "Add a department") {
        // Ask for name of new department
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the department to add?",
              name: "depName",
            },
          ])
          .then((response) => {
            addDepartment(db, response.depName);
          });
      } else if (response.action === "Add a role") {
        // Get list of current departments
        let departmentInfo = await getDepartmentInfo(db);
        const departmentIds = departmentInfo[0],
          availableDepartments = departmentInfo[1];

        // Ask for new role data
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the title of the role to add?",
              name: "roleTitle",
            },
            {
              type: "input",
              message: "What is the salary of the new role?",
              name: "roleSalary",
            },
            {
              type: "list",
              message: "What department is the new role part of?",
              choices: availableDepartments,
              name: "roleDepName",
            },
          ])
          .then((response) => {
            const depIndex = availableDepartments.findIndex(
              (el) => el === response.roleDepName
            );
            addRole(db, {
              title: response.roleTitle,
              salary: response.roleSalary,
              department_id: departmentIds[depIndex],
            });
          });
      } else if (response.action === "Add an employee") {
        let roleInfo = await getRoleInfo(db);
        const roleIds = roleInfo[0],
          availableRoles = roleInfo[1],
          roleSalaries = roleInfo[2];
        let employeeInfo = await getEmployeeInfo(db);
        const employeeIds = employeeInfo[0],
          currentEmployees = employeeInfo[1];

        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the employee to add?",
              name: "employeeName",
            },
            {
              type: "list",
              message: "What role does the employee have?",
              choices: availableRoles,
              name: "employeeRole",
            },
            {
              type: "list",
              message:
                'Choose a manager for the employee or "null" if no manager',
              choices: currentEmployees.concat(["null"]),
              name: "employeeManager",
            },
          ])
          .then((response) => {
            const roleIndex = availableRoles.findIndex(
              (el) => el === response.employeeRole
            );
            let manager = "NULL";
            if (response.employeeManager !== "null") {
              const managerIndex = currentEmployees.findIndex(
                (el) => el === response.employeeManager
              );
              manager = employeeIds[managerIndex];
            }

            addEmployee(db, {
              first_name: response.employeeName.split(" ")[0],
              last_name: response.employeeName.split(" ")[1],
              role_id: roleIds[roleIndex],
              manager_id: manager,
            });
          });
      } else if (response.action === "Update an employee role") {
        let employeeInfo = await getEmployeeInfo(db);
        const employeeIds = employeeInfo[0],
          employeeNames = employeeInfo[1];
        let roleInfo = await getRoleInfo(db);
        const roleIds = roleInfo[0],
          roleTitles = roleInfo[1],
          roleSalaries = roleInfo[2];

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee would you like to update?",
              choices: employeeNames,
              name: "employeeName",
            },
            {
              type: "list",
              message: "What is their new role?",
              choices: roleTitles,
              name: "newRoleTitle",
            },
          ])
          .then((response) => {
            const employeeIndex = employeeNames.findIndex(
              (el) => el === response.employeeName
            );
            const roleIndex = roleTitles.findIndex(
              (el) => el === response.newRoleTitle
            );

            updateEmployee(db, employeeIds[employeeIndex], roleIds[roleIndex]);
          });
      }
    });
}

init();
