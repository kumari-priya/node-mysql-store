/* Schema for SQL database/table */
DROP DATABASE IF EXISTS bamazon_DB;

/* Create database */
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

/* Create new table products with a primary key that auto-increments*/
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

/*Alter table for supervisor module*/
ALTER TABLE products ADD COLUMN `product_sales` DECIMAL(10,2) DEFAULT 0;

/* Create new table departments with a primary key that auto-increments*/
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);
