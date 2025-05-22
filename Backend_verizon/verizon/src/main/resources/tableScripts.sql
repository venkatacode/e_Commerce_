
drop database if exists verizon_db;
 
 
create database verizon_db;
 
use verizon_db;
 
CREATE TABLE User (
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   user_name VARCHAR(255) ,
   full_name VARCHAR(255) ,
   address VARCHAR(255),
   city VARCHAR(255),
   state VARCHAR(255),
   country VARCHAR(255),
   pincode INT,
   user_email VARCHAR(255) ,
   phone_no BIGINT,
   password VARCHAR(255)
);
 
 
CREATE TABLE Mobile (
   mobile_id INT AUTO_INCREMENT PRIMARY KEY,
   brand VARCHAR(255) ,
   model VARCHAR(255) ,
   price DOUBLE,
   display_size VARCHAR(255),
   processor VARCHAR(255),
   ram VARCHAR(255),
   storage VARCHAR(255),
   image_url VARCHAR(255),
   camera VARCHAR(255),
   battery VARCHAR(255),
   color VARCHAR(255)
);
 
 
CREATE TABLE Cart (
   cart_id INT AUTO_INCREMENT PRIMARY KEY,
   quantity INT,
   user_id INT,
   mobile_id INT,
   FOREIGN KEY (user_id) REFERENCES User(user_id) ,
   FOREIGN KEY (mobile_id) REFERENCES Mobile(mobile_id)
);
 
 
CREATE TABLE Orders (
   order_id INT AUTO_INCREMENT PRIMARY KEY,
   total_price DOUBLE,
   order_date DATE,
   address VARCHAR(255),
   city VARCHAR(255),
   state VARCHAR(255),
   country VARCHAR(255),
   pincode INT,
   user_id INT,
   mobile_id INT,
   FOREIGN KEY (user_id) REFERENCES User(user_id) ,
   FOREIGN KEY (mobile_id) REFERENCES Mobile(mobile_id)
);
 
 
 
INSERT INTO User (user_name, full_name, address, city, state, country, pincode, user_email, phone_no, password)
VALUES 
('jdoe', 'John Doe', '123 Elm St', 'Springfield', 'Illinois', 'USA', 62701, 'jdoe@example.com', 1234567890, 'password123'),
 
('asmith', 'Alice Smith', '456 Oak St', 'Springfield', 'Illinois', 'USA', 62702, 'asmith@example.com', 9876543210, 'securepass'),
 
('bjohnson', 'Bob Johnson', '789 Pine St', 'Springfield', 'Illinois', 'USA', 62703, 'bjohnson@example.com', 4561237890, 'mypassword'),
 
('ctaylor', 'Carol Taylor', '101 Maple St', 'Springfield', 'Illinois', 'USA', 62704, 'ctaylor@example.com', 3216549870, 'anotherpass');
 
 
 
 
INSERT INTO Mobile (brand, model, price, display_size, processor, ram, storage, image_url, camera, battery, color)
VALUES 
('Apple', 'iPhone 14', 999.99, '6.1 inches', 'A15 Bionic', '6 GB', '128 GB', 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202210/06/00194612200868____8__1200x1200.jpg', '12 MP', '3279 mAh', 'Black'),
 
('Samsung', 'Galaxy S23', 799.99, '6.1 inches', 'Snapdragon 8 Gen 2', '8 GB', '256 GB', 'https://m-cdn.phonearena.com/images/article/147268-two/Samsung-Galaxy-S24-and-Galaxy-S24-Plus-could-recycle-the-design-of-their-predecessors.jpg', '50 MP', '3900 mAh', 'Phantom Black'),
 
('OnePlus', 'OnePlus 11', 699.99, '6.7 inches', 'Snapdragon 8 Gen 2', '8 GB', '128 GB', 'https://miro.medium.com/v2/resize:fit:474/1*cu_K_znbkM5mUO2gDzybTA.jpeg', '50 MP', '5000 mAh', 'Green'),
 
('Google', 'Pixel 7', 599.99, '6.3 inches', 'Google Tensor G2', '8 GB', '128 GB', 'https://th.bing.com/th/id/OIP.WJvcA4VMHo-VWvgnPbwgXQHaEK?rs=1&pid=ImgDetMain', '50 MP', '4355 mAh', 'Obsidian');
 
 
INSERT INTO Cart (quantity, user_id, mobile_id)
VALUES 
(1, 1, 1),  -- User 1 adds 1 of Mobile 1
(2, 2, 2),  -- User 2 adds 2 of Mobile 2
(1, 3, 3),  -- User 3 adds 1 of Mobile 3
(3, 4, 4);  -- User 4 adds 3 of Mobile 4
 
 
INSERT INTO Orders (total_price, order_date, address, city, state, country, pincode, user_id, mobile_id)
VALUES 
(999.99, '2024-10-24', '123 Elm St', 'Springfield', 'Illinois', 'USA', 62701, 1, 1),  -- Order by User 1 for Mobile 1
(799.99, '2024-10-25', '456 Oak St', 'Springfield', 'Illinois', 'USA', 62702, 2, 2),  -- Order by User 2 for Mobile 2
(699.99, '2024-10-26', '789 Pine St', 'Springfield', 'Illinois', 'USA', 62703, 3, 3),  -- Order by User 3 for Mobile 3
(599.99, '2024-10-27', '101 Maple St', 'Springfield', 'Illinois', 'USA', 62704, 4, 4);  -- Order by User 4 for Mobile 4


commit;
 
select * from Mobile;
select * from User;
select * from Orders;
select * from Cart;