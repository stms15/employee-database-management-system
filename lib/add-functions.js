async function addDepartment(database, newDepartment) {
  await new Promise((resolve, reject) => {
    database.query(
      `INSERT INTO departments (name) VALUES ("${newDepartment}");`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

async function addRole(database, roleData) {
  await new Promise((resolve, reject) => {
    database.query(
      `INSERT INTO roles (title, salary, department_id) VALUES ("${roleData.title}", "${roleData.salary}", "${roleData.department_id}");`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

async function addEmployee(database, employeeData) {
  await new Promise((resolve, reject) => {
    database.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employeeData.first_name}", "${employeeData.last_name}", "${employeeData.role_id}", ${employeeData.manager_id});`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

module.exports = { addDepartment, addRole, addEmployee };
