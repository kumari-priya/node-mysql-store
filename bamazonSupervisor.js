var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "eqk8S8GB6fj8",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  promptUser();
});

function promptUser() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          getSales();
          break;

        case "Create New Department":
          addDepartment();
          break;
      }
    });
}

function getSales() {
  var query = "SELECT DISTINCT departments.department_id,departments.department_name,departments.over_head_costs, (SELECT SUM(product_sales) FROM products WHERE departments.department_name = products.department_name) AS total_product_sales, ((SELECT total_product_sales)-departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Department ID: " +
        res[i].department_id +
        "Department Name: " +
        res[i].department_name +
        " || Over Head Cost: " +
        res[i].over_head_costs +
        " || Product Sales: " +
        res[i].total_product_sales +
        " || Total Profit: " +
        res[i].total_profit
      );
    }
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt([{
        name: "name",
        type: "input",
        message: "Enter Department Name: "
      },
      {
        name: "cost",
        type: "input",
        message: "Enter Over Head Cost: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = connection.query(
        "INSERT INTO departments SET ?", {
          department_name: answer.name,
          over_head_costs: answer.cost
        },
        function(err, res) {
          if (res.affectedRows > 0) {
            console.log("Department Added!");
            promptUser();
          } else {
            console.log("Can't add Department now!\n");
          }
        }
      );
    });
}
