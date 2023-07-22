async function deleteDepartment(database, id) {
  await new Promise((resolve, reject) => {
    database.query(
      `DELETE FROM departments WHERE id = ${id};`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

async function deleteRole(database, id) {
  await new Promise((resolve, reject) => {
    database.query(
      `DELETE FROM roles WHERE id = ${id};`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

async function deleteEmployee(database, id) {
  await new Promise((resolve, reject) => {
    database.query(
      `DELETE FROM employees WHERE id = ${id};`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
