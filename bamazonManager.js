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
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          getProduct();
          break;

        case "View Low Inventory":
          getLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;
      }
    });
}

function getProduct() {
  var query = "SELECT item_id,product_name,department_name,price,stock_quantity FROM products;";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Product ID: " +
        res[i].item_id +
        " || Product Name: " +
        res[i].product_name +
        " || Department: " +
        res[i].department_name +
        " || price: " +
        res[i].price +
        " || Stock Quantity: " +
        res[i].stock_quantity
      );
    }
    promptUser();
  });
}

function getLowInventory() {
  var query = "SELECT item_id,product_name,department_name,price,stock_quantity FROM products WHERE stock_quantity<10;";
  connection.query(query, function(err, res) {
    data = res;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Product ID: " +
        res[i].item_id +
        " || Product Name: " +
        res[i].product_name +
        " || Department: " +
        res[i].department_name +
        " || price: " +
        res[i].price +
        " || Stock Quantity: " +
        res[i].stock_quantity
      );
    }
    promptUser();
  });
}

function addInventory() {
  connection.query("SELECT item_id, product_name FROM products", function(err, res) {
    var products = [];
    for (var i = 0; i < res.length; i++) {
      products.push(res[i].product_name);
    }
    inquirer
      .prompt([{
          name: "product",
          type: "list",
          message: "Select the Product?",
          choices: products
        },
        {
          name: "units",
          type: "input",
          message: "Enter Number of Units: ",
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
          "UPDATE products SET stock_quantity=stock_quantity+?  WHERE product_name=?", [answer.units, answer.product],
          function(err, res) {
            if (res.affectedRows > 0) {
              console.log("Inventory Added!");
              promptUser();
            } else {
              console.log("Can't add Inventory now!\n");
            }
          }
        );
      });
  });
}

function addNewProduct() {
  connection.query("SELECT department_name FROM products GROUP BY department_name", function(err, res) {
    var departments = [];
    for (var i = 0; i < res.length; i++) {
      departments.push(res[i].department_name);
    }
    inquirer
      .prompt([{
          name: "productName",
          type: "input",
          message: "Enter Product Name: ",
          validate: function(value) {
            if (value.length > 0) {
              return true;
            }
            return false;
          }
        },
        {
          name: "department",
          type: "list",
          message: "Select the Department?",
          choices: departments

        },
        {
          name: "price",
          type: "input",
          message: "Enter Price: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "Enter Stock Quantity: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
      ])
      .then(function(answer) {
        var query = connection.query(
          "INSERT INTO products SET ?", {
            product_name: answer.productName,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err, res) {
            if (res.affectedRows > 0) {
              console.log("Product Added!");
              promptUser();
            } else {
              console.log("Can't add Product now!\n");
            }
          }
        );
      });
  });
}
