DROP DATABASE touristapp;
CREATE DATABASE touristapp;
USE touristapp;

CREATE TABLE registration(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE clients(
  client_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  birthday DATE,
  city VARCHAR(20),
  country VARCHAR(20),
  nationality VARCHAR(20),
  email VARCHAR(20),
  phone VARCHAR(20),
  FOREIGN KEY (client_id) REFERENCES registration(id)
);