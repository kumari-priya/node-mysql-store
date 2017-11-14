/* Insert mock data in products table*/
INSERT INTO `bamazon_DB`.`products`
(`product_name`,`department_name`,`price`,`stock_quantity`,`product_sales`)
VALUES
('Barbie Fairytale Dress Up Doll','Toys',18.84,150,2000),
('Disney Frozen Little Kingdom Elsa’s Frozen Castle','Toys',19.99,70,2600),
('My Tooth Is About to Fall Out','Books',3.99,350,3000),
('The Giving Tree','Books',11.39,67,2500),
('Tommy Hilfiger Peacoat Puffer Jacket','Clothing',48.99,110,9000),
('Calvin Klein Aerial Jacket','Clothing',65.99,49,2000),
('ProForm Performance 600i Treadmill','Health',799.00,56,6000),
('Nokia Go – Activity & Sleep tracker','Health',49.95,5,4000),
('Sony WH1000XM2 Headphones','Electronics',349.99,72,9000),
('All-New Kindle Oasis E-reader','Electronics',349.99,29,6000);

/* Insert mock data in departments table*/
INSERT INTO `bamazon_DB`.`departments`
(`department_name`,`over_head_costs`)
VALUES
('Toys',1100),
('Books',1700),
('Clothing',5000),
('Health',2500),
('Electronics',3500);
