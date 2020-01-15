DROP DATABASE touristapp;
CREATE DATABASE touristapp;
USE touristapp;

CREATE TABLE registration(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE clients(
  client_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  birthday DATE,
  city VARCHAR(50),
  country VARCHAR(50),
  nationality VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(50),
  FOREIGN KEY (client_id) REFERENCES registration(id)
);

CREATE TABLE admins(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE newlocations(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  latitude DECIMAL(10,5),
  longitude DECIMAL(10,5),
  openTime TIME,
  closeTime TIME,
  phone VARCHAR(50),
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
  FOREIGN KEY (client_id) REFERENCES registration(id)
);