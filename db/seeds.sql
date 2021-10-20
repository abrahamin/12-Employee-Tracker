INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, "Sales"),
       (2, "Salesperson", 80000, "Sales"),
       (3, "Lead Engineer", 150000, "Engineering"),
       (4, "Software Engineer", 120000, "Engineering"),
       (5, "Account Manager", 160000, "Finance"),
       (6, "Accountant", 125000, "Finance"),
       (7, "Legal Team Lead", 250000, "Legal"),
       (8, "Lawyer", 190000, "Legal");
       

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, null),
       (2, "Mike", "Chan", 2, 1),
       (3, "Ashley", "Rodriguez", 3, null),
       (4, "Kevin", "Tupik", 4, 3),
       (5, "Kunal", "Singh", 5, null),
       (6, "Malia", "Brown", 6, 5),
       (7, "Sarah", "Lourd", 7, null),
       (8, "Tom", "Allen", 8, 7);