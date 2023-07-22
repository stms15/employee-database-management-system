async function updateEmployee(database, employeeId, newRoleId) {
  await new Promise((resolve, reject) => {
    database.query(
      `UPDATE employees SET role_id = "${newRoleId}" WHERE id = ${employeeId};`,
      function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

module.exports = updateEmployee;
