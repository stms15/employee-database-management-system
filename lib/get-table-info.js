async function getDepartmentInfo(database) {
  const result = await new Promise((resolve, reject) => {
    database.query("SELECT * FROM departments", function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const departments = result.map(function (element, index) {
    return element.name;
  });
  const ids = result.map(function (element) {
    return element.id;
  });

  return [ids, departments];
}

async function getRoleInfo(database) {
  const result = await new Promise((resolve, reject) => {
    database.query("SELECT * FROM roles", function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const ids = result.map((element) => {
    return element.id;
  });
  const titles = result.map((element) => {
    return element.title;
  });
  const salaries = result.map((element) => {
    return element.salary;
  });

  return [ids, titles, salaries];
}

async function getEmployeeInfo(database) {
  const result = await new Promise((resolve, reject) => {
    database.query("SELECT * FROM employees", function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  const ids = result.map((element) => {
    return element.id;
  });
  const names = result.map((element) => {
    return element.first_name + " " + element.last_name;
  });

  return [ids, names];
}

module.exports = { getDepartmentInfo, getRoleInfo, getEmployeeInfo };
