var mysql = require("mysql");
var inquirer = require("inquirer");
var mySqlConnection = require('./mySqlConnection.js')

var data;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "eqk8S8GB6fj8",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  var query = "SELECT item_id,product_name,department_name,price,stock_quantity FROM products;";
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

function promptUser() {
  inquirer
    .prompt([{
        name: "productID",
        type: "input",
        message: "Enter Product ID: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
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
      for (var i = 0; i < data.length; i++) {
        if (data[i].item_id == answer.productID && data[i].stock_quantity >= answer.units) {
          updateProduct(answer.productID, answer.units, data[i].price);
        } else if (data[i].item_id == answer.productID && data[i].stock_quantity < answer.units) {
          console.log("Insufficient quantity!\n");
        }
      }
      runSearch();
    });
}

function updateProduct(itemId, stockQuantity, price) {
  var totalCost = stockQuantity * price;
  var query = connection.query(
    "UPDATE products SET stock_quantity=stock_quantity-?,product_sales=product_sales+? WHERE item_id=?", [stockQuantity, totalCost, itemId],
    function(err, res) {
      if (res.affectedRows > 0) {
        console.log("Order placed!");
        console.log(`Total cost $ ${totalCost} \n`);
      } else {
        console.log("Can't place the order now!\n");
      }
    }
  );
}
