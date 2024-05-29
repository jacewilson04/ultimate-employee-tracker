const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const wait = require('wait')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '1234',
        database: 'employee_db'
    },
);

console.log(`Connected to the employee_db database.`)

// Queries all departments
async function view_departments() {
    let promise = new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', function (err, results) {
            resolve([err, results]);
        });
    });

    return promise;
}

// Queries all roles
async function view_roles() {
    let promise = new Promise((resolve, reject) => {
        db.query('SELECT * FROM role', function (err, results) {
            resolve([err, results]);
        });
    });

    return promise;
}

// Queries all employees
async function view_employees() {
    let promise = new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee', function (err, results) {
            resolve([err, results]);
        });
    });

    return promise;
}

// Inserts a new department
async function add_department() {
    let promise = new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Department Name',
                name: 'department_name',
            }
        ]).then((response) => {
            console.log("Attempting to add new department!");

            db.query('INSERT INTO department (name) VALUES (?)', [response.department_name], function(err, results) {
                resolve([err]);
            });
        });
    });

    return promise
}

// Inserts a new role
async function add_role() {
    let promise = new Promise((resolve, reject) => {

        // Queries the departments first so we can add them to inquirer
        db.query('SELECT * FROM department', function (err, departments) {
            // Formats data so inquirer can use it and we can read it afterwards
            let departmentChoice = [];
            let departmentNameToId = {};

            for (let i = 0; i < departments.length; i++) {
                let department = departments[i]

                departmentChoice.push(department.name)
                departmentNameToId[department.name] = department.id
            }

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Role Name',
                    name: 'role_name',
                },
                {
                    type: 'input',
                    message: 'Salary',
                    name: 'salary',
                },
                {
                    type: 'list',
                    message: 'Department',
                    name: 'department',
                    choices: departmentChoice,
                }
            ]).then((response) => {

                console.log("Attempting to add new role!")

                // Gets the department id based on it's name
                const department_id = departmentNameToId[response.department];
    
                // Inserts new role data
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.role_name, response.salary, department_id], function(err, results) {
                    resolve([err])
                });
            });
        })
    });

    return promise
}

// Inserts new employee
async function add_employee() {
    let promise = new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'First Name',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Last Name',
                name: 'last_name',
            },
            {
                type: 'input',
                message: 'Role Id',
                name: 'role_id',
            },
            {
                type: 'input',
                message: 'Manager Id',
                name: 'manager_id',
            }
        ]).then((response) => {
            console.log("Attempting to add new employee!");

            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.first_name, response.last_name, response.role_id, response.manager_id],
            function(err, results) {
                resolve([err]);
            });
        });
    });

    return promise
}

// Changes employee role
async function update_employee_role() {
    let promise = new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Employee Id',
                name: 'employee_id',
            },
            {
                type: 'input',
                message: 'New Role Id',
                name: 'role_id',
            }
        ]).then((response) => {
            console.log("Attempting to update employee");
            
            // Sets the employees role
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id], function(err, results) {
                resolve([err]);
            });
        });
    });

    return promise
}

// Main run time function
async function main() {
    // Ask client what they would like to do
    let responce = await inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'name',
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee role"
        ],
    }])

    // Store the action so we can universely do things with it later
    let action;

    switch (responce.name) {
    case "view all departments":
        action = view_departments;
        break;
    case "view all roles":
        action = view_roles;
        break;
    case "view all employees":
        action = view_employees;
        break;
    case "add a department":
        action = add_department;
        break;
    case "add a role":
        action = add_role;
        break;
    case "add an employee":
        action = add_employee;
        break;
    case "update an employee role":
        action = update_employee_role;
        break;
    }

    // wait for the action to finish itself
    let promise_results = await action();

    let err = promise_results[0];
    let results = promise_results[1];

    await wait(200)

    // Tell client data that was returned
    if (!err) {
        console.log("Success!")

        await wait(1000)

        if (results) {
            console.log(results)
        }
    } else {
        console.log("Failure!")

        await wait(1000)

        console.log(err)
    }

    let leave = await inquirer.prompt([
    {
        type: 'confirm',
        message: 'Return home?',
        name: 'home',
    }])


    // If you anwsered yes return to prompts otherwise end process
    if (leave.home) {
        main()
    }

    // Process does not end?
}

main()