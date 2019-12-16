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

CREATE TABLE admins(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE newlocations(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  latitude DECIMAL(10,5),
  longitude DECIMAL(10,5),
  openTime TIME,
  closeTime TIME,
  phone VARCHAR(20),
  email VARCHAR(50),
  type VARCHAR(20),
  rating DECIMAL(3,2),
  price DECIMAL(20,10),
  url VARCHAR(50)
);

CREATE TABLE reviews(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  client_id INT NOT NULL,
  location_id INT,
  created_at DATETIME,
  content TEXT,
  rating FLOAT(3, 1),
  FOREIGN KEY (client_id) REFERENCES registration(id),
  FOREIGN KEY (location_id) REFERENCES newlocations(id)
);

CREATE TABLE history(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  client_id INT,
  latitude DECIMAL(10,5),
  longitude DECIMAL(10,5),
  arrival_at DATETIME,
  leave_at DATETIME,
  FOREIGN KEY (client_id) REFERENCES registration(id)
);