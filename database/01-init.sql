CREATE DATABASE IF NOT EXISTS auth;
USE auth;

CREATE TABLE account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    position_id BIGINT NOT NULL
    -- logical FK to hr.position
);

CREATE TABLE account_role (
    account_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (account_id, role_id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE DATABASE IF NOT EXISTS hr;
USE hr;

CREATE TABLE employee (
    id BINARY(16) PRIMARY KEY,
    fullname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    level VARCHAR(50),
    position_id BIGINT NOT NULL,
    account_id BIGINT NULL UNIQUE
    -- account_id will be set later by HR after calling Auth
);

CREATE TABLE department (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    manager_id BINARY(16) NOT NULL UNIQUE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE position (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    base_wage DECIMAL(12,2) NOT NULL,
    department_id BIGINT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE DATABASE IF NOT EXISTS inv;
USE inv;

CREATE TABLE warehouse (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    size VARCHAR(50),
    description VARCHAR(255),
    manager_id BINARY(16) NOT NULL UNIQUE
    -- logical FK to hr.employee(id)
);

CREATE TABLE product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    unit VARCHAR(50),
    unit_price DECIMAL(12,2) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE stock (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    warehouse_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE (product_id, warehouse_id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
);

GRANT ALL PRIVILEGES ON auth.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON hr.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON inv.* TO 'erp_user'@'%';
