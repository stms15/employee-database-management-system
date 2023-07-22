function viewAllDepartments(database) {
  database.query("SELECT * FROM departments", function (error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });
}

function viewAllRoles(database) {
  database.query(
    "SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles JOIN departments ON roles.department_id=departments.id;",
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );
}

function viewAllEmployees(database) {
  database.query(
    "SELECT A.id, A.first_name, A.last_name, roles.title, roles.salary, departments.name AS department_name, CONCAT(B.first_name, ' ', B.last_name) AS manager_name FROM employees A JOIN roles ON A.role_id=roles.id JOIN departments ON roles.department_id=departments.id LEFT JOIN employees B ON A.manager_id=B.id ORDER BY A.id;",
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );
}

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
