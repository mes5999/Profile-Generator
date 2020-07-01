const Employee = require('./lib/employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const util = require("util");

// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");

let managerArray = [];
let engineerArray = [];
let internArray = [];
let employeeData = [];




const adminOptions = [
    {
        type: "list",
        message: "Would you like to:",
        name: "adminOptions",
        choices: [
            'Add an employee to the team?',
            'Create the team HTML page?'
        ]
    }
]

const adminQuestions = [
    {
        type: "input",
        message: "Hello, what is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "confirm",
        message: "Are you a manager?",
        name: "position",
        choices: [
            'Yes',
            'No'
        ]
    }
];

const questions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's title?",
        name: "title",
        choices: [
            'engineer',
            'intern'
        ]
    }
];

const managerQuestion = [
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }

];

const engineerQuestion = [
    {
        type: "input",
        message: "What is the employee's GithUb username?",
        name: "gitname"
    }

];

const internQuestion = [
    {
        type: "input",
        message: "What school did the employee go to?",
        name: "school"
    }

];


let init =
    async function adminStart() {

        await Inquirer
            .prompt(adminQuestions)

            .then(async function (userData) {
                let managerInfo = {
                    'name': userData.name,
                    'id': JSON.parse(userData.id),
                    'email': userData.email,
                    'role': 'employee',
                    'title': 'manager',
                    'officeNumber': '',
                    'gitname': '',
                    'github': '',
                    'school': ''

                }
                if (position = true) {
                    employeeData.push(managerInfo)
                    newEmployee()
                }
            })
    }
let secondAdmin =
    async function adminNext() {
        await Inquirer
            .prompt(adminOptions)
            .then(async function (answers) {
                if (answers.adminOptions === 'Add an employee to the team?') {
                    employeeData.length = 0;
                    input();
                }
                if (answers.adminOptions === 'Create the team HTML page?') {
                    createteam();

                }
            })
    };

let input =
    async function initialize() {
        await Inquirer
            .prompt(questions)

            .then(async function (userData) {
                let userInfo = {
                    'name': userData.name,
                    'id': JSON.parse(userData.id),
                    'email': userData.email,
                    'role': 'employee',
                    'title': userData.title,
                    'officeNumber': '',
                    'gitname': '',
                    'github': '',
                    'school': ''
                }
                employeeData.push(userInfo)
                newEmployee()
            })
    };

let newEmployee =
    async function employeeprofile() {
        const name = employeeData[0].name;
        const id = employeeData[0].id;
        const email = employeeData[0].email;
        const role = employeeData[0].role;

        const employee = new Employee(name, id, email, role)
        classBuilder()
    };



let classBuilder =
    async function bytitle() {

        if (employeeData[0].title === "manager") {
            buildManager()
        }
        if (employeeData[0].title === "engineer") {
            buildEngineer()
        }
        if (employeeData[0].title === "intern") {
            buildIntern()
        }
    };

async function buildManager() {

    await Inquirer
        .prompt(managerQuestion)

        .then(async function (userData) {
            let managerAns = {
                'officeNumber': JSON.parse(userData.officeNumber)
            }
            employeeData[0].officeNumber = managerAns.officeNumber;

            const name = employeeData[0].name;
            const id = employeeData[0].id;
            const email = employeeData[0].email;
            const role = employeeData[0].role;
            const officeNumber = employeeData[0].officeNumber;

            const manager = new Manager(name, id, email, officeNumber)
            managerArray.push(manager);

        })

    secondAdmin()
};

async function buildEngineer() {
    await Inquirer
        .prompt(engineerQuestion)

        .then(async function (userData) {
            let engineerInfo = {
                'gitname': userData.gitname
            }
            employeeData[0].gitname = engineerInfo.gitname;


            const name = employeeData[0].name;
            const id = employeeData[0].id;
            const email = employeeData[0].email;
            const role = employeeData[0].role;
            const gitname = employeeData[0].gitname;
            const github = employeeData[0].github;

            const engineer = new Engineer(name, id, email, gitname, github)

            engineerArray.push(engineer)


        })
    secondAdmin()

};

async function buildIntern() {
    await Inquirer
        .prompt(internQuestion)

        .then(async function (userData) {
            let internInfo = {
                'school': userData.school
            }
            employeeData[0].school = internInfo.school;
        })
    const name = employeeData[0].name;
    const id = employeeData[0].id;
    const email = employeeData[0].email;
    const role = employeeData[0].role;
    const school = employeeData[0].school;

    const intern = new Intern(name, id, email, school);
    internArray.push(intern)
    secondAdmin()
};


createteam =
    async function teamHTML() {


        fs.writeFileSync('./output/mainpage.html',
            '<DOCTYPE! HTML>' +
            '<html>' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<link rel="stylesheet" type="text/css" href="style.css">' +
            '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0"/> ' +
            '<meta http-equiv="X-UA-Compatible" content="ie=edge" />' +
            '</head>' +
            '<body>' +
            '<header>' +
            '<h1>' + 'Company Team Page' + '</h1>' +
            '</header>' +
            '<container>' +
            '<div class="row">' +
            '<div class="col-sm-10">'
        );

        fs.appendFileSync('./output/mainpage.html',
            '<div id="manager">' +
            '<div class="card">' +
            '<div class="card-header bg-info">' + managerArray[0].name + '</div>' +
            '<div class="card-body">' +
            '<div class=content>' +

            '<p>' + "ID: " + managerArray[0].id + '</p>' + '<hr>' +
            '<p>' + "Email: " + managerArray[0].email + '</p>' + '<hr>' +
            '<p>' + "Office Number: " + managerArray[0].officeNumber + '</p>' + '<hr>' +

            '</div>' +
            '</div>' +
            '<div class="card-footer bg-info">' + "Manager" + '</div>' +
            '</div>' +
            '</div>'
        );

        for (i = 0; i < engineerArray.length; i++) {
            fs.appendFileSync('./output/mainpage.html',
                '<div id="engineer">' +
                '<div class="card">' +
                '<div class="card-header bg-primary">' + engineerArray[i].name + '</div>' +
                '<div class="card-body">' +
                '<div class=content>' +

                '<p>' + "ID: " + engineerArray[i].id + '</p>' + '<hr>' +
                '<p>' + "Email " + engineerArray[i].email + '</p>' + '<hr>' +
                '<p>' + "GitHub username: " + engineerArray[i].gitname + '</p>' + '<hr>' +

                '</div>' +
                '</div>' +
                '<div class="card-footer bg-primary">' + 'Engineer' + '</div>' +
                '</div>' +
                '</div>'
            );
        }

        for (i = 0; i < internArray.length; i++) {
            fs.appendFileSync('./output/mainpage.html',
                '<div id="intern">' +
                '<div class="card">' +
                '<div class="card-header bg-success">' + internArray[i].name + '</div>' +
                '<div class="card-body">' +
                '<div class=content>' +

                '<p>' + "ID: " + internArray[i].id + '</p>' + '<hr>' +
                '<p>' + "Email: " + internArray[i].email + '</p>' + '<hr>' +
                '<p>' + "School: " + internArray[i].school + '</p>' + '<hr>' +

                '</div>' +
                '</div>' +
                '<div class="card-footer bg-success">' + 'Intern' + '</div>' +
                '</div>' +
                '</div>'
            );
        }

        fs.appendFileSync('./output/mainpage.html',
            '</div>' +
            '</div>' +
            '</container>' +
            '</body>' +
            '</html>'
        );

        console.log('Your html file for the team page is in the output folder')
    }

init();