CREATE DATABASE IF NOT EXISTS auth;
USE auth;

CREATE TABLE principal_counter (
    department_code VARCHAR(50) NOT NULL,
    position_code   VARCHAR(50) NOT NULL,
    next_value      BIGINT NOT NULL,
    PRIMARY KEY (department_code, position_code)
);

INSERT INTO principal_counter (department_code, position_code, next_value) VALUES
('IT', 'ADMIN', 1),
('HR',  'HR_MGR', 1),
('INV', 'WH_MGR', 1),
('IT',  'EMP',    1);

CREATE TABLE account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    employee_id BINARY(16) NULL UNIQUE -- logical FK to hr.employee(id)
);

-- Accounts
INSERT INTO account (username, password, status, employee_id) VALUES
(
    'ITADMIN001',
    '{bcrypt}$2b$10$aL2zjKoLD/nd2ZkYf0zFLOxaxz1ErAlF.Kdi/4Ln0S820GOyxOMVe',
    'ACTIVE',
    UNHEX(REPLACE('9d95a9ff-1539-430f-8364-3c67290363e0', '-', ''))
),
-- RAW PASSWORD: itadmin001
(
    'HRHR_MGR001',
    '{bcrypt}$2b$10$ATqKUMGtWzuQg77LfzgOa.Ua4oGow99Hy0SJLP3OgdtaJ66U9dJtu',
    'ACTIVE',
    UNHEX(REPLACE('feddfe75-ba1e-4085-afd6-b4caac70b481', '-', ''))
),
-- RAW PASSWORD: hrhr_mgr001
(
    'INVWH_MGR001',
    '{bcrypt}$2b$10$6gsRPiz2YG3nrw27csH9jOWXF4RV57tCM1YAYRcGICbPs7XNU5m2O',
    'ACTIVE',
    UNHEX(REPLACE('38164cdc-2557-40e8-8a9e-2876eef5528e', '-', ''))
),
-- RAW PASSWORD: invwh_mgr001
(
    'ITEMP001',
    '{bcrypt}$2b$10$gs1zpwS9qVwxMudk3ssBluuBw30p6jRM1SlSEDyWEAQI4qvR9EWRi',
    'ACTIVE',
    UNHEX(REPLACE('7c9ae089-037c-4996-a953-cb0601033bcd', '-', ''))
);
-- RAW PASSWORD: itemp001

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
(UNHEX(REPLACE('9d95a9ff-1539-430f-8364-3c67290363e0', '-', '')), 'Nguyen Van Admin', 'admin@erp.com', 'Senior', 1, 1),
(UNHEX(REPLACE('feddfe75-ba1e-4085-afd6-b4caac70b481', '-', '')), 'Tran Thi HR',     'hr@erp.com',    'Senior', 2, 2),
(UNHEX(REPLACE('38164cdc-2557-40e8-8a9e-2876eef5528e', '-', '')), 'Le Van Kho',      'inv@erp.com',   'Mid',    3, 3),
(UNHEX(REPLACE('7c9ae089-037c-4996-a953-cb0601033bcd', '-', '')), 'Pham Van Emp',    'emp@erp.com',   'Junior', 4, 4);


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

CREATE DATABASE IF NOT EXISTS catalog;
USE catalog;

-- =========================
-- Category
-- =========================
CREATE TABLE category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

INSERT INTO category (code, name, description, status) VALUES
('ELEC', 'Electronics', 'Electronic devices and accessories', 'ACTIVE'),
('FURN', 'Furniture', 'Office and home furniture', 'ACTIVE'),
('STAT', 'Stationery', 'Office stationery supplies', 'ACTIVE');

-- =========================
-- Manufacturer
-- =========================
CREATE TABLE manufacturer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    country VARCHAR(100),
    description VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

INSERT INTO manufacturer (code, name, country, description, status) VALUES
('DELL', 'Dell Inc.', 'USA', 'Computer manufacturer', 'ACTIVE'),
('GEN',  'Generic Supplier', 'Vietnam', 'Local supplier', 'ACTIVE');

-- =========================
-- Product (master data)
-- =========================
CREATE TABLE product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(50),
    unit_price DECIMAL(12,2) NOT NULL CHECK (unit_price > 0),
    description VARCHAR(255),
    category_id BIGINT NOT NULL,
    manufacturer_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

INSERT INTO product (sku, name, unit, unit_price, description, category_id, manufacturer_id, status) VALUES
(
    'SKU-001',
    'Laptop Dell XPS',
    'Piece',
    1800.00,
    'High-end laptop',
    (SELECT id FROM category WHERE code = 'ELEC'),
    (SELECT id FROM manufacturer WHERE code = 'DELL'),
    'ACTIVE'
),
(
    'SKU-002',
    'Office Chair',
    'Piece',
    120.00,
    'Ergonomic chair',
    (SELECT id FROM category WHERE code = 'FURN'),
    (SELECT id FROM manufacturer WHERE code = 'GEN'),
    'ACTIVE'
),
(
    'SKU-003',
    'A4 Paper',
    'Ream',
    4.50,
    '80gsm A4 paper',
    (SELECT id FROM category WHERE code = 'STAT'),
    (SELECT id FROM manufacturer WHERE code = 'GEN'),
    'ACTIVE'
);

CREATE DATABASE IF NOT EXISTS inv;
USE inv;

-- =========================
-- Warehouse
-- =========================
CREATE TABLE warehouse (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    size VARCHAR(50),
    description VARCHAR(255),
    manager_id BINARY(16) NOT NULL UNIQUE
    -- logical FK to hr.employee(id)
);

INSERT INTO warehouse (name, location, size, description, manager_id) VALUES
(
    'Main Warehouse',
    'HCMC - District 9',
    'Large',
    'Central inventory warehouse',
    (SELECT id FROM hr.employee LIMIT 1)
);

-- =========================
-- Stock (current state)
-- =========================
CREATE TABLE stock (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,      -- logical FK to catalog.product(id)
    warehouse_id BIGINT NOT NULL,    -- logical FK to warehouse(id)
    quantity INT NOT NULL,
    UNIQUE (product_id, warehouse_id)
);

INSERT INTO stock (product_id, warehouse_id, quantity) VALUES
(
    (SELECT id FROM catalog.product WHERE sku = 'SKU-001'),
    1,
    50
),
(
    (SELECT id FROM catalog.product WHERE sku = 'SKU-002'),
    1,
    200
),
(
    (SELECT id FROM catalog.product WHERE sku = 'SKU-003'),
    1,
    1000
);

-- =========================
-- Stock Movement (audit / history)
-- =========================
CREATE TABLE stock_movement (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,            -- logical FK to catalog.product(id)
    from_warehouse_id BIGINT,
    to_warehouse_id BIGINT,
    quantity INT NOT NULL,
    movement_type VARCHAR(50) NOT NULL,   -- TRANSFER, IMPORT, EXPORT, ADJUSTMENT
    performed_by BINARY(16),               -- logical FK to hr.employee(id)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON auth.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON hr.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON catalog.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON inv.* TO 'erp_user'@'%';
