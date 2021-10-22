# 12-Employee-Tracker

  ## Description

  The purpose of this project was to incorporate content management systems (CMS) in building a command-line application utilizing Node.js and MySQL to manage a company's employee database. The MySQL2, Inquirer, and console.table packages were used to connect to the MySQL database, interact with the user via the command line, and print MySQL rows to the console, respectively.
  
  In order to meet the Acceptance Criteria of the project:

  * starting the application presents the user with the option to view departments/roles/employees, add departments/roles/employees, and update an employee's role
  * `View All Departments` presents a table displaying department names and ids
  * `View All Roles` presents a table displaying job titles, role ids, departments of roles, and salaries
  * `View All Employees` presents a table displaying employee ids, first/last names, job titles, departments, salaries, and their managers
  * `Add Department` prompts the user to enter the name of the department, and it is added to the database
  * `Add Role` prompts the user to enter the name, salary, and department for the new role, and it is added to the database
  * `Add Employee` prompts the user to enter the employee's first/last name, role, manager, and that employee is added to the database
  * `Update Employee Role` prompts the user to select an employee and their new role, and the information is updated in the database

  ## Table of Contents

  * [Installation](#installation)

  * [Usage](#usage)

  * [License](#license)

  * [Contributing](#contributing)

  * [Tests](#tests)

  * [Questions](#questions)

  ## Installation

  To install necessary dependencies, run the following command:

  ```
  npm i
  ```

  ## Usage

  Please use the following link to see a video on how the application can be run:

  [Employee Tracker Example Video](https://watch.screencastify.com/v/TqYpFPBjDvQdAF1KNVZ5)

  For security purposes, the dotenv package was used to conceal the database credentials of the user. In order to connect to the database, a `.env` file must be created containing populated `DB_USER=` and `DB_PASSWORD=` entries appropriate for the user.
  
  Additionally, the database and tables created via the `schema.sql` file can be populated using the `seeds.sql` file provided.

  ## License

  This project is not licensed.

  ## Contributing

  Please contact me using the options provided in the Questions section. Thank you!

  ## Tests

  This project does not contain any tests.

  ## Questions

  If you have any questions about the repo, open an issue or contact me directly at abrahamin.html@gmail.com. You can find more of my work at [https://github.com/abrahamin/](https://github.com/abrahamin/).