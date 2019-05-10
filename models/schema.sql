DROP DATABASE IF EXISTS washroomDb;
CREATE DATABASE washroomDb;
USE washroomDb;

CREATE TABLE authenticationTable (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userName VARCHAR(255) NOT NULL,
password VARCHAR(20) NOT NULL,
lastLogin DATETIME
);

CREATE TABLE ratingsTable (
id INT NOT NULL AUTO_INCREMENT ,
nameOfPlace VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
overallRating INTEGER(1) NOT NULL,
comment VARCHAR(255),
PRIMARY KEY (id) 
);

select * from ratingsTable;
