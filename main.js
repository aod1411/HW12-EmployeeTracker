const questions = require("./questions");
const queryHelper = require("./queryHelper");
const cTable = require("console.table");

async function init() {
   try {
       // const data = getdatafromDB
       mainMenu();
   } catch (err) {
       console.log(err);
   }
}

init();

async function mainMenu() {
   var answer = await questions.mainMenu();
   switch (answer.choice) {
       case "Add": // done
           answer = await questions.addMenu();
           handleAdd(answer.choice);
           break;
       case "View": // done
           answer = await questions.viewMenu();
           handleView(answer.choice);
           break;
       case "Update/Delete": // done
           answer = await questions.updateMenu();
           handleUpdate(answer.choice);
           break;
       case "Exit": // done
           process.exit();
   }
}

async function handleView(choice) {
   switch (choice) {
       case "View all employee information": // done
           // get all employees info here
           var employees = await queryHelper.getEverything();
           console.table(employees);
           mainMenu();
           break;
       case "View employees": // done
           // get employees here
           var employees = await queryHelper.getEmployees();
           console.table(employees);
           mainMenu();
           break;
       case "View departments": // done
           // get departments here
           var departments = await queryHelper.getDepartment();
           console.table(departments);
           mainMenu();
           break;
       case "View oles": // done
           // get oles here
           var oles = await queryHelper.getoles();
           console.table(oles);
           mainMenu();
           break;
       case "View an individual employee": // done
           // get employees here
           var employees = await queryHelper.getEmployees();
           var answer = await questions.whichEmployee(employees, "view");
           var indEmp = await queryHelper.getIndEmployee(answer);
           var indEmpole = await queryHelper.getEmployeeAndole(indEmp);
           console.table(indEmpole);
           mainMenu();
           break;
       case "View employees by manager": //*** works but shows manager and oleid instead of ole
           // get managers here
           var managers = await queryHelper.getManagers();
           var answer = await questions.whichManager(managers, "view employees of");
           var indManager = await queryHelper.getIndEmployee(answer);
           var employees = await queryHelper.getEmployeesByManager(indManager[0]);
           console.table(employees);
           mainMenu();
           break;
       case "View total utilized budget of a department": // ***
           // get departments here
           var departmentBudgets = await queryHelper.getTotalBudget();
           console.table(departmentBudgets);
           mainMenu();
           break;
       case "Back to main menu": // done
           mainMenu();
           break;
   }
}

async function handleAdd(choice) {
   switch (choice) {
       case "Add ole": // done
           var answer = await questions.addoleQuestions();
           var departments = await queryHelper.getDepartment();
           var department = await questions.whichDepartment(departments, "associate with this ole");
           await queryHelper.addole(answer, department);
           console.log("ole added!");
           mainMenu();
           break;
       case "Add employee":
           var answer = await questions.addEmployeeQuestions();
           // get all oles from mysql
           var oles = await queryHelper.getoles();
           // ask the user which ole
           var ole = await questions.whichole(oles, "associate with this employee");
           // get all employees from mysql
           var managers = await queryHelper.getEmployees();
           // ask the user which employee is the manager for the new employee
           var manager = await questions.whichManager(managers, "associate with this employee");
           await queryHelper.addEmployee(answer, ole, manager);
           console.log("Employee added!");
           mainMenu();
           break;


       case "Add department": // done
           var answer = await questions.addDepartmentQuestions();
           await queryHelper.addDepartment(answer);
           console.log("Department added!");
           mainMenu();
           break;
       case "Back to main menu": //done
           mainMenu();
           break;
   }
}

async function handleUpdate(choice) {
   switch (choice) {
       case "Update employee ole": // done
           // get oles here
           var employees = await queryHelper.getEmployees();
           var emp = await questions.whichEmployee(employees, "update");
           var indEmployee = await queryHelper.getIndEmployee(emp);
           var oles = await queryHelper.getoles();
           var answer = await questions.whichole(oles, "assign to this employee");
           var indole = await queryHelper.getIndole(answer);
           await queryHelper.updateole(indEmployee, indole);
           console.log("ole updated");
           mainMenu();
           break;
       case "Update employee manager": // done
           // get employees here
           var employees = await queryHelper.getEmployees();
           var managers = await queryHelper.getManagers();
           var emp = await questions.whichEmployee(employees, "update");
           var manager = await questions.whichManager(
               managers,
               "assign to this employee"
           );
           var indEmployee = await queryHelper.getIndEmployee(emp);
           var indManager = await queryHelper.getIndEmployee(manager);
           await queryHelper.updateManager(indEmployee, indManager);
           console.log("Manager updated!");
           mainMenu();
           break;
       case "Delete department": // done
           // get departments here
           var departments = await queryHelper.getDepartment();
           var answer = await questions.whichDepartment(departments, "delete");
           await queryHelper.deleteDepartment(answer);
           console.log(`Deleted!`);
           mainMenu();
           break;
       case "Delete ole": // done
           // get oles here
           var oles = await queryHelper.getoles();
           var answer = await questions.whichole(oles, "delete");
           await queryHelper.deleteole(answer);
           console.log(`Deleted!`);
           mainMenu();
           break;

       case "Delete employee": // done
           // get employees here
           var employees = await queryHelper.getEmployees();
           var answer = await questions.whichEmployee(employees, "delete");
           await queryHelper.deleteEmployee(answer);
           console.log(`Deleted!`);
           mainMenu();
           break;

       case "Delete department": // done
           // get departments here
           var departments = await queryHelper.getDepartment();
           var answer = await questions.whichDepartment(departments, "delete");
           var answerDept = await queryHelper.getIndDepartment(answer);
           await queryHelper.deleteDepartment(answerDept);
           console.log(`Deleted!`);
           mainMenu();
           break;
       case "Delete ole": // done
           // get oles here
           var oles = await queryHelper.getoles();
           var answer = await questions.whichole(oles, "delete");
           var title = await queryHelper.getIndole(answer);
           await queryHelper.deleteole(title);
           console.log(`Deleted!`);
           mainMenu();
           break;

       case "Back to main menu":
           mainMenu();
           break;
   }
}

