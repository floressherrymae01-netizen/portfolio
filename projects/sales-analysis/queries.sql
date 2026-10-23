-- queries.sql: Sales Analysis (sample practice data, hindi totoong benta)
-- Patakbuhin sa MySQL (hal. phpMyAdmin sa XAMPP).

CREATE DATABASE IF NOT EXISTS store_sales;
USE store_sales;

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month VARCHAR(20) NOT NULL,
  product VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  units_sold INT NOT NULL
);

INSERT INTO sales (month, product, price, units_sold) VALUES
  ('January', 'Bottled Water', 15, 86),
  ('January', 'Instant Noodles', 12, 145),
  ('January', 'Coffee Sachet', 8, 119),
  ('January', 'Biscuits', 10, 46),
  ('January', 'Soft Drink', 20, 84),
  ('February', 'Bottled Water', 15, 121),
  ('February', 'Instant Noodles', 12, 45),
  ('February', 'Coffee Sachet', 8, 155),
  ('February', 'Biscuits', 10, 142),
  ('February', 'Soft Drink', 20, 143),
  ('March', 'Bottled Water', 15, 94),
  ('March', 'Instant Noodles', 12, 152),
  ('March', 'Coffee Sachet', 8, 93),
  ('March', 'Biscuits', 10, 53),
  ('March', 'Soft Drink', 20, 146);

-- 1. Lahat ng data
SELECT * FROM sales;

-- 2. Total sales ng bawat product (pinakamataas muna)
SELECT product, SUM(price * units_sold) AS total_sales
FROM sales
GROUP BY product
ORDER BY total_sales DESC;

-- 3. Total sales kada buwan
SELECT month, SUM(price * units_sold) AS monthly_sales
FROM sales
GROUP BY month;

-- 4. Best-selling product (pinakamataas ang sales)
SELECT product, SUM(price * units_sold) AS total_sales
FROM sales
GROUP BY product
ORDER BY total_sales DESC
LIMIT 1;

-- 5. Average sales kada product
SELECT AVG(product_total) AS average_sales
FROM (SELECT SUM(price * units_sold) AS product_total FROM sales GROUP BY product) AS t;