const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        username: process.env.DB_USER,
        password:process.env.DB_PASS,
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

const addEmployeeQs = [
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
        choices: ['']
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: ['']
    },
];

const updateEmployeeQs = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s role do you want to update?',
        choices: ['']
    },
    {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to assign the selected employee?',
        choices: ['']
    },
];

const addRoleQs = [
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
        choices: ['']
    },
];

const addDepartmentQs = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    },
];