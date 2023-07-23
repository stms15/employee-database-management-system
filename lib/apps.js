const inquirer = require("inquirer");

// Require needed lib functions
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./view-functions");
const { addDepartment, addRole, addEmployee } = require("./add-functions");
const {
  getDepartmentInfo,
  getRoleInfo,
  getEmployeeInfo,
} = require("./get-table-info");
const updateEmployee = require("./update-employee-info");
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require("./remove-functions");

// -------- Functions ------- //

function addingDepartmentApp(database) {
  // Ask for name of new department
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department to add?",
        name: "depName",
      },
    ])
    .then(async (response) => {
      await addDepartment(database, response.depName);
      viewAllDepartments(database);
    });
}

async function addingRoleApp(database) {
  // Get list of current departments
  let departmentInfo = await getDepartmentInfo(database);
  const departmentIds = departmentInfo[0],
    availableDepartments = departmentInfo[1];

  // Ask for new role's data
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
    .then(async (response) => {
      const depIndex = availableDepartments.findIndex(
        (el) => el === response.roleDepName
      );
      await addRole(database, {
        title: response.roleTitle,
        salary: response.roleSalary,
        department_id: departmentIds[depIndex],
      });
      viewAllRoles(database);
    });
}

async function addingEmployeeApp(database) {
  // Get current role and employee info
  let roleInfo = await getRoleInfo(database);
  const roleIds = roleInfo[0],
    availableRoles = roleInfo[1],
    roleSalaries = roleInfo[2];
  let employeeInfo = await getEmployeeInfo(database);
  const employeeIds = employeeInfo[0],
    currentEmployees = employeeInfo[1];

  // Ask for new employee's data
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
        message: 'Choose a manager for the employee or "null" if no manager',
        choices: currentEmployees.concat(["null"]),
        name: "employeeManager",
      },
    ])
    .then(async (response) => {
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

      await addEmployee(database, {
        first_name: response.employeeName.split(" ")[0],
        last_name: response.employeeName.split(" ")[1],
        role_id: roleIds[roleIndex],
        manager_id: manager,
      });
      viewAllEmployees(database);
    });
}

async function updatingEmployeeApp(database) {
  // Get current employee and role info
  let employeeInfo = await getEmployeeInfo(database);
  const employeeIds = employeeInfo[0],
    employeeNames = employeeInfo[1];
  let roleInfo = await getRoleInfo(database);
  const roleIds = roleInfo[0],
    roleTitles = roleInfo[1],
    roleSalaries = roleInfo[2];

  // Ask for employee to change and new role to assign
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
    .then(async (response) => {
      const employeeIndex = employeeNames.findIndex(
        (el) => el === response.employeeName
      );
      const roleIndex = roleTitles.findIndex(
        (el) => el === response.newRoleTitle
      );

      await updateEmployee(
        database,
        employeeIds[employeeIndex],
        roleIds[roleIndex]
      );
      viewAllEmployees(database);
    });
}

async function deletingDepartmentApp(database) {
  // Get current department list
  let departmentInfo = await getDepartmentInfo(database);
  const departmentIds = departmentInfo[0],
    departmentNames = departmentInfo[1];

  // Ask for department to remove
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which department would you like to remove?",
        choices: departmentNames,
        name: "depName",
      },
    ])
    .then(async (response) => {
      const index = departmentNames.findIndex((el) => el === response.depName);
      await deleteDepartment(database, departmentIds[index]);
      viewAllDepartments(database);
    });
}

async function deletingRoleApp(database) {
  // Get current role info
  let roleInfo = await getRoleInfo(database);
  const roleIds = roleInfo[0],
    roleTitles = roleInfo[1];

  // Ask for role to remove
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which department would you like to remove?",
        choices: roleTitles,
        name: "roleTitle",
      },
    ])
    .then(async (response) => {
      const index = roleTitles.findIndex((el) => el === response.roleTitle);
      await deleteRole(database, roleIds[index]);
      viewAllRoles(database);
    });
}

async function deletingEmployeeApp(database) {
  // Get current employee info
  let employeeInfo = await getEmployeeInfo(database);
  const employeeIds = employeeInfo[0],
    employeeNames = employeeInfo[1];

  // Ask for employee to remove
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which department would you like to remove?",
        choices: employeeNames,
        name: "employeeName",
      },
    ])
    .then(async (response) => {
      const index = employeeNames.findIndex(
        (el) => el === response.employeeName
      );
      await deleteEmployee(database, employeeIds[index]);
      viewAllEmployees(database);
    });
}

module.exports = {
  addingDepartmentApp,
  addingRoleApp,
  addingEmployeeApp,
  updatingEmployeeApp,
  deletingDepartmentApp,
  deletingRoleApp,
  deletingEmployeeApp,
};
