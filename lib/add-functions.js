function addDepartment(database, newDepartment) {
  database.query(
    `INSERT INTO departments (name) VALUES ("${newDepartment}");`,
    function (error, results) {
      if (error) {
        throw new Error(error.message);
      }
      console.log(results);
    }
  );
}

function addRole(database, roleData) {
  database.query(
    `INSERT INTO roles (title, salary, department_id) VALUES ("${roleData.title}", "${roleData.salary}", "${roleData.department_id}");`,
    function (error, results) {
      if (error) {
        throw new Error(error.message);
      }
      console.log(results);
    }
  );
}

function addEmployee(database, employeeData) {
  database.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${employeeData.first_name}", "${employeeData.last_name}", "${employeeData.role_id}", ${employeeData.manager_id});`,
    function (error, results) {
      if (error) {
        throw new Error(error.message);
      }
      console.log(results);
    }
  );
}

module.exports = { addDepartment, addRole, addEmployee };
