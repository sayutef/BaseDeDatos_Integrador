create database inicio_db, 

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id_fk INT NOT NULL,
    created_at DATETIME NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL,
    FOREIGN KEY (role_id_fk) REFERENCES Role(role_id)
);

CREATE TABLE PurchaseOrder (
    purchaseOrder_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    client_id_fk INT NOT NULL,
    shippingAddress VARCHAR(255) NOT NULL,
    orderStatus VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL,
    FOREIGN KEY (client_id_fk) REFERENCES Client(client_id)
);


CREATE TABLE Product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    type_measurement VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL
);
CREATE TABLE Delivery (
    delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    purchaseOrder_id_fk INT NOT NULL,
    created_at DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    date DATETIME NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL,
    FOREIGN KEY (purchaseOrder_id_fk) REFERENCES PurchaseOrder(purchaseOrder_id)
);
CREATE TABLE Client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL,
    updated_by VARCHAR(255) NOT NULL,
    deleted BOOLEAN NOT NULL
);
