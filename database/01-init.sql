CREATE DATABASE IF NOT EXISTS auth;
USE auth;

CREATE TABLE account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- Accounts
INSERT INTO account (username, password, status) VALUES
(
    'admin',
    '{bcrypt}$2b$10$4VuLqNyxzIGYvbVXLuRAH.x69iMRLXp9YywK1LbvkuTfx7szmnOLu',
    'ACTIVE'
),
-- RAW PASSWORD: admin123
(
    'hr01',
    '{bcrypt}$2b$10$e3QKwydRGUdFd/5OT1Cz5edwV1OcskiJZlXKUMSVGyFh.fh9jnyju',
    'ACTIVE'
),
-- RAW PASSWORD: hr123
(
    'inv01',
    '{bcrypt}$2b$10$vN1g3VIgZ9nDXkCpCY628.yS2DZ6zzufmMF6VfHyajjtRZribjXR.',
    'ACTIVE'
),
-- RAW PASSWORD: inv123
(
    'employee01',
    '{bcrypt}$2b$10$G3GcTEKYG/GaEcfdl4n87.RacZXy5knb99hrU6OSIxgwnEaGYkjcS',
    'ACTIVE'
);
-- RAW PASSWORD: emp123

CREATE TABLE role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    position_id BIGINT NOT NULL
    -- logical FK to hr.position
);

-- Roles (position_id logically maps to hr.position.id)
INSERT INTO role (code, description, position_id) VALUES
('ROLE_ADMIN',      'System administrator', 1),
('ROLE_HR_MANAGER', 'HR management role',   2),
('ROLE_WAREHOUSE',  'Warehouse manager',    3),
('ROLE_EMPLOYEE',   'Normal employee',      4);

CREATE TABLE account_role (
    account_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (account_id, role_id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Account ↔ Role mapping
INSERT INTO account_role (account_id, role_id) VALUES
(1, 1),  -- admin → ROLE_ADMIN
(2, 2),  -- hr01 → ROLE_HR_MANAGER
(3, 3),  -- inv01 → ROLE_WAREHOUSE
(4, 4);  -- employee01 → ROLE_EMPLOYEE

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

-- Employees (UUID stored as BINARY(16))
INSERT INTO employee (id, fullname, email, level, position_id, account_id) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Nguyen Van Admin', 'admin@erp.com', 'Senior', 1, 1),
(UNHEX(REPLACE(UUID(), '-', '')), 'Tran Thi HR',     'hr@erp.com',    'Senior', 2, 2),
(UNHEX(REPLACE(UUID(), '-', '')), 'Le Van Kho',      'inv@erp.com',   'Mid',    3, 3),
(UNHEX(REPLACE(UUID(), '-', '')), 'Pham Van Emp',    'emp@erp.com',   'Junior', 4, 4);


CREATE TABLE department (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    manager_id BINARY(16) NULL UNIQUE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Departments
INSERT INTO department (code, name, description, manager_id) VALUES
('IT', 'Information Technology', 'System & infrastructure', NULL),
('HR', 'Human Resources',        'People management',       NULL),
('INV','Inventory',              'Warehouse & stock',       NULL);

CREATE TABLE position (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    base_wage DECIMAL(12,2) NOT NULL,
    department_id BIGINT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Positions
INSERT INTO position (code, name, description, base_wage, department_id) VALUES
('ADMIN',    'System Admin',      'Full system access',   3000.00, 1),
('HR_MGR',   'HR Manager',        'HR operations',        2500.00, 2),
('WH_MGR',   'Warehouse Manager','Manage warehouse',     2200.00, 3),
('EMP',      'Employee',          'General employee',     1200.00, 1);

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

-- Warehouses (manager_id logically maps to hr.employee.id)
INSERT INTO warehouse (name, location, size, description, manager_id) VALUES
(
    'Main Warehouse',
    'HCMC - District 9',
    'Large',
    'Central inventory warehouse',
    (SELECT id FROM hr.employee LIMIT 1)
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

-- Products
INSERT INTO product (sku, name, category, unit, unit_price, description) VALUES
('SKU-001', 'Laptop Dell XPS',   'Electronics', 'Piece', 1800.00, 'High-end laptop'),
('SKU-002', 'Office Chair',     'Furniture',   'Piece',  120.00, 'Ergonomic chair'),
('SKU-003', 'A4 Paper',         'Stationery',  'Ream',    4.50,  '80gsm A4 paper');

CREATE TABLE stock (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    warehouse_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE (product_id, warehouse_id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
);

-- Stock
INSERT INTO stock (product_id, warehouse_id, quantity) VALUES
(1, 1, 50),
(2, 1, 200),
(3, 1, 1000);

GRANT ALL PRIVILEGES ON auth.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON hr.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON inv.* TO 'erp_user'@'%';
