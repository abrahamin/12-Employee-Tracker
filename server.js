const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dotenv = require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "employees_db"
    },
);

const initialQs = [
    {
        type: 'list',
        name: 'intent',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
    },
];

function employeeTracker() {
    inquirer.prompt(initialQs)
        .then(function userIntent(data) {
            switch (data.intent) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'Quit':
                    process.exit();
            }
        })
        .catch((err) => console.error(err))
};

const viewEmployees = () => {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id ASC", (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('\n');
        employeeTracker()
    });
};

const addEmployee = () => {
    let roleArray = [];
    let managerArray = [];

    db.query("SELECT role.id, role.title FROM role", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(role => {
                let roleName = `${role.id} ${role.title}`
                roleArray.push(roleName)
            });
        };
    });

    db.query("SELECT employee.id, employee.first_name, employee.last_name FROM employee", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(manager => {
                let managerName = `${manager.id} ${manager.first_name} ${manager.last_name}`
                managerArray.push(managerName)
            });
        };
    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: roleArray
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: managerArray
        },
    ])
    .then(function (answer) {
        let addedRole = parseInt(answer.role);
        let addedManager = parseInt(answer.manager);
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first, answer.last, addedRole, addedManager], (err, results) => {viewEmployees()})
    })
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const updateEmployee = () => {
    let employeeArray = [];
    let assignArray = [];

    db.query("SELECT employee.id, employee.first_name, employee.last_name FROM employee", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(employee => {
                let employeeName = `${employee.id} ${employee.first_name} ${employee.last_name}`
                employeeArray.push(employeeName)
            });
        };
    });

    db.query("SELECT role.id, role.title FROM role", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(assign => {
                let assignName = `${assign.id} ${assign.title}`
                assignArray.push(assignName)
            });
        };
    });

    inquirer.prompt([
        {
            type: 'confirm',
            name: 'promotion',
            message: 'Is the employee getting a promotion?',
        },
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s role do you want to update?',
            choices: employeeArray
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: assignArray
        },
    ])
    .then(function (answer) {
        let updatedEmployee = parseInt(answer.employee);
        let updatedRole = parseInt(answer.role);
        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [updatedRole, updatedEmployee], (err, results) => {console.log("Updated successfully!"); viewEmployees()})
    })
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const viewRoles = () => {
    db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id ASC", (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('\n');
        employeeTracker()
    });
};

const addRole = () => {
    let departmentArray = [];

    db.query("SELECT department.id, department.name FROM department", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(department => {
                let departmentName = `${department.id} ${department.name}`
                departmentArray.push(departmentName)
            });
        };
    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does the role belong to?',
            choices: departmentArray
        },
    ])
    .then(function (answer) {
        let addedDepartment = parseInt(answer.department);
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.name, answer.salary, addedDepartment], (err, results) => {viewRoles()})
    })
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const viewDepartments = () => {
    db.query("SELECT department.id, department.name AS department FROM department", (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('\n');
        employeeTracker()
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ])
    .then(function (answer) {
        db.query("INSERT INTO department (name) VALUES (?)", [answer.name], (err, results) => {viewDepartments()})
    })
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
}

employeeTracker();