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
    console.log('Connected to the employees_db database.')
);

const initialQs = [
    {
        type: 'list',
        name: 'intent',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
];

function employeeTracker() {
    inquirer.prompt(initialQs)
        .then(function userIntent(data) {
            if (data.intent === 'View All Employees') {
                viewEmployees();
            }
            if (data.intent === 'Add Employee') {
                addEmployee();
            }
            if (data.intent === 'Update Employee Role') {
                updateEmployee();
            }
            if (data.intent === 'View All Roles') {
                viewRoles();
            }
            if (data.intent === 'Add Role') {
                addRole();
            }
            if (data.intent === 'View All Departments') {
                viewDepartments();
            }
            if (data.intent === 'Add Department') {
                addDepartment();
            }
            if (data.intent === 'Quit') {
                
            }
        })
        .catch((err) => console.error(err))
};

const viewEmployees = () => {
    db.query("SELECT * FROM employee", (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('\n');
        employeeTracker()
    });
};

const addEmployee = () => {
    let roleArray = [];
    let managerArray = [];

    db.query("SELECT role.id as Id, role.title as Title FROM role", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(role => {
                let roleName = `${role.Id} ${role.Title}`
                roleArray.push(roleName)
            });
        };
    });

    db.query("SELECT employee.id as Id, employee.first_name as First, employee.last_name as Last FROM employee", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(manager => {
                let managerName = `${manager.Id} ${manager.First} ${manager.Last}`
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
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const updateEmployee = async () => {
    let employeeArray = [];
    let assignArray = [];

    db.query("SELECT employee.id as Id, employee.first_name as First, employee.last_name as Last FROM employee", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(employee => {
                let employeeName = `${employee.Id} ${employee.First} ${employee.Last}`
                employeeArray.push(employeeName)
            });
        };
    });

    db.query("SELECT role.id as Id, role.title as Title FROM role", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(assign => {
                let assignName = `${assign.Id} ${assign.Title}`
                assignArray.push(assignName)
            });
        };
    });

    await inquirer.prompt([
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
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const viewRoles = () => {
    db.query("SELECT * FROM role", (err, results) => {
        console.table(results)
    });
};

const addRole = () => {
    let departmentArray = [];

    db.query("SELECT department.id as Id, department.name as Name FROM department", (err, results) => {
        if (err) {
            console.error(err)
        } else {
            results.forEach(department => {
                let departmentName = `${department.Id} ${department.Name}`
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
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
};

const viewDepartments = () => {
    db.query("SELECT * FROM department", (err, results) => {
        console.table(results)
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
    .catch((err) => err ? console.log(err) : console.log('Oops!'));
}

employeeTracker();