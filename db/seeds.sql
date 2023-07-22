INSERT INTO departments (name)
VALUES ("Accounting"),
        ("Human Resources"),
        ("Administration"),
        ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Financial Analyst", 70000, 1),
        ("Accountant", 61000, 1),
        ("Recruiter", 64000, 2),
        ("Chief Human Resources Officer", 140000, 2),
        ("Receptionist", 35000, 3),
        ("Administrative Manager", 75000, 3),
        ("Database Administrator", 83000, 4),
        ("Computer Security Engineer", 102000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Smith", 8, NULL),
        ("Jill", "Long", 7, NULL),
        ("John", "Doe", 2, NULL),
        ("Tracy", "Brown", 1, NULL),
        ("Linda", "Lee", 4, NULL),
        ("Chris", "Point", 3, 5),
        ("Will", "Johnson", 6, NULL),
        ("Ashley", "Evans", 5, 7),
        ("Mary", "Lang", 3, 5),
        ("Josh", "Anderson", 2, NULL);