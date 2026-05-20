CREATE DATABASE IF NOT EXISTS auth;
USE auth;

CREATE TABLE principal_counter (
    department_code VARCHAR(50) NOT NULL,
    position_code   VARCHAR(50) NOT NULL,
    next_value      BIGINT NOT NULL,
    PRIMARY KEY (department_code, position_code)
);

INSERT INTO principal_counter (department_code, position_code, next_value) VALUES
('IT', 'SYS', 2),
('IT', 'STAFF', 2),
('HR', 'MGR', 3),
('INV', 'HEAD', 3),
('CAT', 'OFF', 4),
('ANL', 'SPEC', 3);

CREATE TABLE account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    employee_id BINARY(16) NULL UNIQUE -- logical FK to hr.employee(id)
);

-- Accounts
INSERT INTO account (username, password, status, employee_id) VALUES
-- RAW PASSWORD: itsys001
(
    'ITSYS001',
    '{bcrypt}$2b$10$s2nRV/AoLe56R7qHU3exjuv9D/icoFwiAVWJJq3EXPzkn3Z0B5Tga',
    'ACTIVE',
    UNHEX(REPLACE('aea489c9-dea2-4376-aa5b-8ffcb1e58773', '-', ''))
),
-- RAW PASSWORD: itsys002
(
    'ITSYS002',
    '{bcrypt}$2b$10$g8ei1ZZHcjFSVqEvT5xruOtIV.EIoDMzC2/X.shMhBOEAKm12gWB6',
    'ACTIVE',
    UNHEX(REPLACE('fe0c263a-f6f8-4714-89f7-b1bd27396a62', '-', ''))
),
-- RAW PASSWORD: itstaff001
(
    'ITSTAFF001',
    '{bcrypt}$2b$10$IOXtxh33toHzWqSbe9.GTOiNRtp8r2A3PV.wD7lrHtWcjz8CCIuvG',
    'ACTIVE',
    UNHEX(REPLACE('6118482c-c57a-4a67-855d-dbdea4fc30b0', '-', ''))
),
-- RAW PASSWORD: itstaff002
(
    'ITSTAFF002',
    '{bcrypt}$2b$10$b2SC9U5AQeqZarppbZrGceBxDGcyNsQU/wCZqKJHCDnqFLySQqwnu',
    'ACTIVE',
    UNHEX(REPLACE('931705e5-d63a-4c5f-8e0f-a3db5caf3c76', '-', ''))
),
-- RAW PASSWORD: hrmgr001
(
    'HRMGR001',
    '{bcrypt}$2b$10$Bny5bU39vvX7wSrg2qv/K./sV1W.DyM.K1x0C9My2sNDKqkVs4.0i',
    'ACTIVE',
    UNHEX(REPLACE('20ccc3cb-a947-46c3-931f-52cebfa87687', '-', ''))
),
-- RAW PASSWORD: hrmgr002
(
    'HRMGR002',
    '{bcrypt}$2b$10$TKgOxk1A5LWnbekutP1JjeANKj57ugesQwYIVUbV49Go5qaQTrrXq',
    'ACTIVE',
    UNHEX(REPLACE('98ed0b9d-14da-4da6-ae8a-fdfb9d29eda9', '-', ''))
),
-- RAW PASSWORD: hrmgr003
(
    'HRMGR003',
    '{bcrypt}$2b$10$VoE2Z/cJV0YoX8I2rZz5vupowKySrAfvVB1mwr/.GxiMf8GgkVZOW',
    'ACTIVE',
    UNHEX(REPLACE('e9903614-89fa-43f1-8a57-33dcf8fe5dc7', '-', ''))
),
-- RAW PASSWORD: invhead001
(
    'INVHEAD001',
    '{bcrypt}$2b$10$l2qc8T60V3OjEv46D4cFquEgqmM3poMsyjHnVZ1ZiUdYt7IIMQhFS',
    'ACTIVE',
    UNHEX(REPLACE('e01eebb1-aed4-4e27-bc52-517fe36f5a5d', '-', ''))
),
-- RAW PASSWORD: invhead002
(
    'INVHEAD002',
    '{bcrypt}$2b$10$rNXezrUNLA6UywLiU3QzjuGnAAeqqMGM5zLxV4bb6b4VKIdhWr.PO',
    'ACTIVE',
    UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', ''))
),
-- RAW PASSWORD: invhead003
(
    'INVHEAD003',
    '{bcrypt}$2b$10$U9BCuW4JzOFbIJlKMxp5XuECG7ozJWCPVO5R26HCYSF8iIIBU5.fC',
    'ACTIVE',
    UNHEX(REPLACE('987574b4-490b-4cb8-bb26-de659969274a', '-', ''))
),
-- RAW PASSWORD: catoff001
(
    'CATOFF001',
    '{bcrypt}$2b$10$ALNxCt6Ih6cGujBagtLcqeExRf8rPZC8aFdSHVh2IUvNLwcGthYa.',
    'ACTIVE',
    UNHEX(REPLACE('3d6b887a-12cf-4554-85ca-925d03ba10ec', '-', ''))
),
-- RAW PASSWORD: catoff002
(
    'CATOFF002',
    '{bcrypt}$2b$10$d5ChyZ2rCFcUmIWYGsv8.eQR6LcJkqknFo9ykCFyNK1mtdaGr0Hby',
    'ACTIVE',
    UNHEX(REPLACE('3371e5e2-d3d1-4056-ad63-e8bf3c55b9af', '-', ''))
),
-- RAW PASSWORD: catoff003
(
    'CATOFF003',
    '{bcrypt}$2b$10$OyL5YTub4ph0jCKlqmrjh.cT4C8wOBDXc3WC2Qx1xc0oKPSVRnswm',
    'ACTIVE',
    UNHEX(REPLACE('e2eea52b-fe84-44a7-bde9-58f0c5de1e6b', '-', ''))
),
-- RAW PASSWORD: catoff004
(
    'CATOFF004',
    '{bcrypt}$2b$10$d8GoBQv8I1PNtvnQdwvE9e55Nie.k8LALTnsPjySR9zchfXi0Hnsm',
    'ACTIVE',
    UNHEX(REPLACE('115a9cc2-3632-49be-aaef-b7c4da2529e4', '-', ''))
),
-- RAW PASSWORD: anlspec001
(
    'ANLSPEC001',
    '{bcrypt}$2b$10$w9X2wV6dVBiT8jtH6k0uFOGUaID6Ms9b0Jr5Q6Yg..V88fMUaxsMG',
    'ACTIVE',
    UNHEX(REPLACE('5a78e8b6-f6ab-432d-a2aa-81d3369f5b96', '-', ''))
),
-- RAW PASSWORD: anlspec002
(
    'ANLSPEC002',
    '{bcrypt}$2b$10$nMUQELrLzVrW2pCCUmtFAOcuD0GzoTEJ2oC6IXIJyvwVEIM/wAmdy',
    'ACTIVE',
    UNHEX(REPLACE('c7ee1c97-3961-4233-8271-8a6b4d43354c', '-', ''))
),
-- RAW PASSWORD: anlspec003
(
    'ANLSPEC003',
    '{bcrypt}$2b$10$0o2QjtnF5gtI1o5D.bTwGO2siy1yMR5aWHSDifPSXeWgNDQVzuRlC',
    'ACTIVE',
    UNHEX(REPLACE('11cbbf52-d1c0-49fa-91a4-34cf8570b62b', '-', ''))
);

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
('ROLE_EMPLOYEE',   'Normal employee',      4),
('ROLE_CATALOG_OFFICER', 'Catalog management role', 5),
('ROLE_BUSINESS_ANALYST', 'Business analysis role', 6);

CREATE TABLE account_role (
    account_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (account_id, role_id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Account ↔ Role mapping
INSERT INTO account_role (account_id, role_id) VALUES
(1, 1),
(2, 1),
(3, 4),
(4, 4),
(5, 2),
(6, 2),
(7, 2),
(8, 3),
(9, 3),
(10, 3),
(11, 5),
(12, 5),
(13, 5),
(14, 5),
(15, 6),
(16, 6),
(17, 6);

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
(UNHEX(REPLACE('aea489c9-dea2-4376-aa5b-8ffcb1e58773', '-', '')), 'Alice Smith', 'alice.smith@erp.com', 'Senior', 1, 1),
(UNHEX(REPLACE('fe0c263a-f6f8-4714-89f7-b1bd27396a62', '-', '')), 'John Doe', 'john.doe@erp.com', 'Mid', 1, 2),
(UNHEX(REPLACE('6118482c-c57a-4a67-855d-dbdea4fc30b0', '-', '')), 'Sarah Connor', 's.connor@erp.com', 'Junior', 4, 3),
(UNHEX(REPLACE('931705e5-d63a-4c5f-8e0f-a3db5caf3c76', '-', '')), 'Mike Peters', 'm.peters@erp.com', 'Junior', 4, 4),
(UNHEX(REPLACE('20ccc3cb-a947-46c3-931f-52cebfa87687', '-', '')), 'Jane Miller', 'jane.m@erp.com', 'Senior', 2, 5),
(UNHEX(REPLACE('98ed0b9d-14da-4da6-ae8a-fdfb9d29eda9', '-', '')), 'Kevin Hart', 'k.hart@erp.com', 'Mid', 2, 6),
(UNHEX(REPLACE('e9903614-89fa-43f1-8a57-33dcf8fe5dc7', '-', '')), 'Linda Ross', 'l.ross@erp.com', 'Junior', 2, 7),
(UNHEX(REPLACE('e01eebb1-aed4-4e27-bc52-517fe36f5a5d', '-', '')), 'Bob Builder', 'bob.b@erp.com', 'Senior', 3, 8),
(UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', '')), 'Charlie Day', 'c.day@erp.com', 'Mid', 3, 9),
(UNHEX(REPLACE('987574b4-490b-4cb8-bb26-de659969274a', '-', '')), 'Frank Reynolds', 'f.reynolds@erp.com', 'Junior', 3, 10),
(UNHEX(REPLACE('3d6b887a-12cf-4554-85ca-925d03ba10ec', '-', '')), 'Diana Prince', 'd.prince@erp.com', 'Senior', 5, 11),
(UNHEX(REPLACE('3371e5e2-d3d1-4056-ad63-e8bf3c55b9af', '-', '')), 'Barry Allen', 'b.allen@erp.com', 'Mid', 5, 12),
(UNHEX(REPLACE('e2eea52b-fe84-44a7-bde9-58f0c5de1e6b', '-', '')), 'Arthur Curry', 'a.curry@erp.com', 'Junior', 5, 13),
(UNHEX(REPLACE('115a9cc2-3632-49be-aaef-b7c4da2529e4', '-', '')), 'Victor Stone', 'v.stone@erp.com', 'Junior', 5, 14),
(UNHEX(REPLACE('5a78e8b6-f6ab-432d-a2aa-81d3369f5b96', '-', '')), 'Bruce Wayne', 'b.wayne@erp.com', 'Senior', 6, 15),
(UNHEX(REPLACE('c7ee1c97-3961-4233-8271-8a6b4d43354c', '-', '')), 'Clark Kent', 'c.kent@erp.com', 'Mid', 6, 16),
(UNHEX(REPLACE('11cbbf52-d1c0-49fa-91a4-34cf8570b62b', '-', '')), 'Hal Jordan', 'h.jordan@erp.com', 'Junior', 6, 17);


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
('INV','Inventory',              'Warehouse & stock',       NULL),
('CAT', 'Catalog Management', 'Product master data management', NULL),
('ANL', 'Analytics', 'Business intelligence & reporting', NULL);

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
('SYS',   'System Admin',      'Full system access',            3000.00, 1), -- ITSYS
('MGR',   'Manager',           'Department operations head',    2500.00, 2), -- HRMGR
('HEAD',  'Warehouse Manager', 'Manage warehouse & logistics',  2200.00, 3), -- INVHEAD
('STAFF', 'General Staff',     'General employee duties',       1200.00, 1), -- ITSTAFF
('OFF',   'Catalog Officer',   'Product master data management',2000.00, 4), -- CATOFF
('SPEC',  'Business Analyst',  'BI & reporting specialist',     2600.00, 5); -- ANLSPEC

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
('STAT', 'Stationery', 'Office stationery supplies', 'ACTIVE'),
('COMP', 'Computers', 'Laptops, desktops, and server hardware', 'ACTIVE'),
('NETW', 'Networking', 'Routers, switches, and cabling', 'ACTIVE'),
('CLEAN', 'Cleaning', 'Janitorial and sanitation supplies', 'ACTIVE'),
('PANTR', 'Pantry', 'Food, beverages, and kitchen supplies', 'ACTIVE'),
('SAFE', 'Safety', 'PPE and first aid equipment', 'ACTIVE'),
('MKTG', 'Marketing', 'Promotional materials and branded merchandise', 'ACTIVE'),
('TOOL', 'Tools', 'Maintenance and repair equipment', 'ACTIVE');

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
('DELL',  'Dell Technologies Inc.', 'USA',         'Computing and server hardware solutions', 'ACTIVE'),
('LOGI',  'Logitech International',  'Switzerland', 'Computer peripherals and accessories',   'ACTIVE'),
('CISCO', 'Cisco Systems, Inc.',     'USA',         'Networking hardware and telecommunications', 'ACTIVE'),
('HMIL',  'Herman Miller, Inc.',     'USA',         'Premium office furniture and ergonomics', 'ACTIVE'),
('SAMS',  'Samsung Electronics',     'South Korea', 'Semiconductors and consumer electronics', 'ACTIVE');

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
-- DELL (Manufacturer 1): Focus on COMP(4), ELEC(1), NETW(5)
('DELL-LAT-5420', 'Dell Latitude 5420 Laptop', 'Unit', 1200.00, '14-inch Business Laptop', 4, 1, 'ACTIVE'),
('DELL-OPT-7090', 'Dell OptiPlex 7090 Micro', 'Unit', 850.00, 'Compact Desktop PC', 4, 1, 'ACTIVE'),
('DELL-U2723QE',  'Dell UltraSharp 27" 4K', 'Unit', 580.00, 'Professional Monitor', 1, 1, 'ACTIVE'),
('DELL-PWE-R750', 'Dell PowerEdge R750', 'Unit', 4500.00, 'Rack Server for Data Center', 4, 1, 'ACTIVE'),
('DELL-WD19S',    'Dell USB-C Docking Station', 'Unit', 210.00, 'Triple Display Dock', 1, 1, 'ACTIVE'),
('DELL-KB216',    'Dell Wired Keyboard', 'Unit', 25.00, 'Quiet keys black keyboard', 1, 1, 'ACTIVE'),

-- LOGITECH (Manufacturer 2): Focus on ELEC(1), STAT(3), TOOL(10)
('LOGI-MX-MAS3', 'Logitech MX Master 3S', 'Unit', 99.00, 'Wireless Ergonomic Mouse', 1, 2, 'ACTIVE'),
('LOGI-K860',    'Logitech Ergo Keyboard', 'Unit', 120.00, 'Split Wireless Keyboard', 1, 2, 'ACTIVE'),
('LOGI-C920',    'Logitech C920 HD Pro', 'Unit', 79.00, '1080p Business Webcam', 1, 2, 'ACTIVE'),
('LOGI-R500',    'Logitech Laser Presenter', 'Unit', 45.00, 'Bluetooth Presentation Remote', 3, 2, 'ACTIVE'),
('LOGI-H390',    'Logitech USB Headset', 'Unit', 35.00, 'Noise Cancelling Headset', 1, 2, 'ACTIVE'),
('LOGI-BOLT-RX', 'Logitech Bolt Receiver', 'Unit', 12.00, 'USB Wireless Receiver', 1, 2, 'ACTIVE'),

-- CISCO (Manufacturer 3): Focus on NETW(5), SAFE(8)
('CSCO-C9200L',  'Cisco Catalyst 9200L', 'Unit', 2800.00, '24-port Managed Switch', 5, 3, 'ACTIVE'),
('CSCO-ISR-4331', 'Cisco ISR 4331 Router', 'Unit', 3200.00, 'Integrated Services Router', 5, 3, 'ACTIVE'),
('CSCO-CB-10FT', 'Cisco Console Cable 10ft', 'Unit', 15.00, 'RJ45 to DB9 Console Cable', 5, 3, 'ACTIVE'),
('CSCO-MER-MS12', 'Cisco Meraki MS120', 'Unit', 950.00, 'Cloud Managed 8-port Switch', 5, 3, 'ACTIVE'),
('CSCO-FP-1010', 'Cisco Firepower 1010', 'Unit', 1100.00, 'Next-Generation Firewall', 8, 3, 'ACTIVE'),
('CSCO-WAP-9120', 'Cisco Catalyst 9120 AP', 'Unit', 650.00, 'WiFi 6 Access Point', 5, 3, 'ACTIVE'),

-- HERMAN MILLER (Manufacturer 4): Focus on FURN(2), MKTG(9)
('HMIL-AERON-B', 'Herman Miller Aeron Chair', 'Unit', 1450.00, 'Ergonomic Office Chair Size B', 2, 4, 'ACTIVE'),
('HMIL-EMBODY',  'Herman Miller Embody', 'Unit', 1800.00, 'Premium Rhythm Fabric Chair', 2, 4, 'ACTIVE'),
('HMIL-MOTIA',   'Motia Sit-to-Stand Desk', 'Unit', 950.00, 'Electric Height Adjustable Desk', 2, 4, 'ACTIVE'),
('HMIL-FILE-2D', 'Tu Metal Filing Cabinet', 'Unit', 420.00, '2-Drawer Mobile Pedestal', 2, 4, 'ACTIVE'),
('HMIL-LOG-TRAY', 'HM Branded Desk Tray', 'Unit', 45.00, 'Branded Marketing Accessory', 9, 4, 'ACTIVE'),
('HMIL-FLO-ARM', 'Flo Monitor Arm', 'Unit', 240.00, 'Single Dynamic Monitor Mount', 2, 4, 'ACTIVE'),

-- SAMSUNG (Manufacturer 5): Focus on ELEC(1), COMP(4), PANTR(7)
('SAMS-980-1TB', 'Samsung 980 Pro 1TB SSD', 'Unit', 130.00, 'NVMe M.2 Internal SSD', 4, 5, 'ACTIVE'),
('SAMS-T7-2TB',  'Samsung T7 Portable SSD', 'Unit', 180.00, 'External USB 3.2 Drive', 4, 5, 'ACTIVE'),
('SAMS-LS32',    'Samsung 32" Smart Monitor', 'Unit', 350.00, 'M8 UHD with SlimFit Cam', 1, 5, 'ACTIVE'),
('SAMS-TAB-S8',  'Samsung Galaxy Tab S8', 'Unit', 700.00, '11-inch Enterprise Tablet', 4, 5, 'ACTIVE'),
('SAMS-RF28',    'Samsung Smart Fridge', 'Unit', 2200.00, 'Office Pantry Refrigerator', 7, 5, 'ACTIVE'),
('SAMS-RAM-32G', 'Samsung 32GB DDR5 RAM', 'Unit', 110.00, 'Server Grade Memory Module', 4, 5, 'ACTIVE');

CREATE DATABASE IF NOT EXISTS inv;
USE inv;

-- =========================
-- Warehouse
-- =========================
CREATE TABLE warehouse (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    size VARCHAR(50),
    description VARCHAR(255),
    manager_id BINARY(16) NOT NULL UNIQUE
    -- logical FK to hr.employee(id)
);

INSERT INTO warehouse (code, name, location, size, description, manager_id) VALUES
-- Warehouse 1: Managed by INVHEAD001
(
    'HCMEAST', 
    'HCM East Logistics Hub', 
    'District 9, Ho Chi Minh City, Vietnam', 
    '5000 sqm', 
    'Primary distribution center for southern region', 
    UNHEX(REPLACE('e01eebb1-aed4-4e27-bc52-517fe36f5a5d', '-', ''))
),

-- Warehouse 2: Managed by INVHEAD002
(
    'HANOINORTH', 
    'Hanoi Northern Terminal', 
    'Me Linh District, Hanoi, Vietnam', 
    '3500 sqm', 
    'Main hub for northern provinces and electronics storage', 
    UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', ''))
),

-- Warehouse 3: Managed by INVHEAD003
(
    'DANANGCENT', 
    'Da Nang Central Warehouse', 
    'Lien Chieu District, Da Nang, Vietnam', 
    '2000 sqm', 
    'Strategic transit point for central Vietnam', 
    UNHEX(REPLACE('987574b4-490b-4cb8-bb26-de659969274a', '-', ''))
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
-- HCMEAST (Warehouse 1): High volume consumer electronics & furniture
(1, 1, 50),   -- Dell Latitude 5420
(3, 1, 30),   -- Dell UltraSharp 27"
(7, 1, 100),  -- Logitech MX Master 3S
(9, 1, 45),   -- Logitech C920 Webcam
(19, 1, 20),  -- Herman Miller Aeron Chair
(21, 1, 15),  -- Motia Sit-to-Stand Desk
(27, 1, 40),  -- Samsung 32" Smart Monitor
(29, 1, 5),   -- Samsung Smart Fridge

-- HANOINORTH (Warehouse 2): Servers, Networking, and Components
(2, 2, 25),   -- Dell OptiPlex 7090
(4, 2, 10),   -- Dell PowerEdge R750 (High value, lower qty)
(13, 2, 15),  -- Cisco Catalyst 9200L
(14, 2, 8),   -- Cisco ISR 4331 Router
(16, 2, 20),  -- Cisco Meraki MS120
(18, 2, 30),  -- Cisco Catalyst 9120 AP
(25, 2, 200), -- Samsung 980 Pro 1TB SSD (High stock for builds)
(30, 2, 150), -- Samsung 32GB DDR5 RAM

-- DANANGCENT (Warehouse 3): Regional essentials and peripherals
(1, 3, 10),   -- Dell Latitude 5420
(5, 3, 25),   -- Dell USB-C Docking Station
(6, 3, 50),   -- Dell Wired Keyboard
(8, 3, 30),   -- Logitech Ergo Keyboard
(10, 3, 15),  -- Logitech Laser Presenter
(11, 3, 40),  -- Logitech USB Headset
(15, 3, 100), -- Cisco Console Cable 10ft
(26, 3, 60),  -- Samsung T7 Portable SSD

-- Mixed distribution across all for essential stock
(12, 1, 200), -- Logitech Bolt Receiver (HCM)
(12, 2, 150), -- Logitech Bolt Receiver (Hanoi)
(12, 3, 50),  -- Logitech Bolt Receiver (Da Nang)
(17, 2, 5),   -- Cisco Firepower 1010 (Hanoi)
(22, 1, 10),  -- Tu Metal Filing Cabinet (HCM)
(23, 1, 100), -- HM Branded Desk Tray (Marketing/HCM)
(24, 1, 12),  -- Flo Monitor Arm (HCM)
(28, 3, 15);  -- Samsung Galaxy Tab S8 (Da Nang)

-- =========================
-- Stock Movement (audit / history)
-- =========================
CREATE TABLE stock_movement (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    -- product reference
    product_id BIGINT NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    product_name VARCHAR(150) NOT NULL,

    -- warehouse reference
    from_warehouse_id BIGINT,
    from_warehouse_name VARCHAR(100),
    to_warehouse_id BIGINT,
    to_warehouse_name VARCHAR(100),

    quantity INT NOT NULL,
    movement_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,

    performed_by BINARY(16),
    performed_by_name VARCHAR(150),

    reviewed_by BINARY(16),
    reviewed_by_name VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO stock_movement (
    product_id, product_sku, product_name, 
    from_warehouse_id, from_warehouse_name, 
    to_warehouse_id, to_warehouse_name, 
    quantity, movement_type, status, 
    performed_by, performed_by_name, 
    reviewed_by, reviewed_by_name,
    created_at
) VALUES 
(
    1, 'DELL-LAT-5420', 'Dell Latitude 5420 Laptop',
    NULL, NULL, 1, 'HCMEAST',
    50, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-01 08:00:00'
),
(
    3, 'DELL-U2723QE', 'Dell UltraSharp 27" 4K',
    NULL, NULL, 1, 'HCMEAST',
    30, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-03 08:00:00'
),
(
    7, 'LOGI-MX-MAS3', 'Logitech MX Master 3S',
    NULL, NULL, 1, 'HCMEAST',
    100, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-07 08:00:00'
),
(
    9, 'LOGI-C920', 'Logitech C920 HD Pro',
    NULL, NULL, 1, 'HCMEAST',
    45, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-09 08:00:00'
),
(
    19, 'HMIL-AERON-B', 'Herman Miller Aeron Chair',
    NULL, NULL, 1, 'HCMEAST',
    20, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-19 08:00:00'
),
(
    21, 'HMIL-MOTIA', 'Motia Sit-to-Stand Desk',
    NULL, NULL, 1, 'HCMEAST',
    15, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-21 08:00:00'
),
(
    27, 'SAMS-LS32', 'Samsung 32" Smart Monitor',
    NULL, NULL, 1, 'HCMEAST',
    40, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-27 08:00:00'
),
(
    29, 'SAMS-RF28', 'Samsung Smart Fridge',
    NULL, NULL, 1, 'HCMEAST',
    5, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-29 08:00:00'
),
(
    2, 'DELL-OPT-7090', 'Dell OptiPlex 7090 Micro',
    NULL, NULL, 2, 'HANOINORTH',
    25, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-02 08:00:00'
),
(
    4, 'DELL-PWE-R750', 'Dell PowerEdge R750',
    NULL, NULL, 2, 'HANOINORTH',
    10, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-04 08:00:00'
),
(
    13, 'CSCO-C9200L', 'Cisco Catalyst 9200L',
    NULL, NULL, 2, 'HANOINORTH',
    15, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-13 08:00:00'
),
(
    14, 'CSCO-ISR-4331', 'Cisco ISR 4331 Router',
    NULL, NULL, 2, 'HANOINORTH',
    8, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-14 08:00:00'
),
(
    16, 'CSCO-MER-MS12', 'Cisco Meraki MS120',
    NULL, NULL, 2, 'HANOINORTH',
    20, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-16 08:00:00'
),
(
    18, 'CSCO-WAP-9120', 'Cisco Catalyst 9120 AP',
    NULL, NULL, 2, 'HANOINORTH',
    30, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-18 08:00:00'
),
(
    25, 'SAMS-980-1TB', 'Samsung 980 Pro 1TB SSD',
    NULL, NULL, 2, 'HANOINORTH',
    200, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-25 08:00:00'
),
(
    30, 'SAMS-RAM-32G', 'Samsung 32GB DDR5 RAM',
    NULL, NULL, 2, 'HANOINORTH',
    150, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-30 08:00:00'
),
(
    1, 'DELL-LAT-5420', 'Dell Latitude 5420 Laptop',
    NULL, NULL, 3, 'DANANGCENT',
    10, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-01 08:00:00'
),
(
    5, 'DELL-WD19S', 'Dell USB-C Docking Station',
    NULL, NULL, 3, 'DANANGCENT',
    25, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-05 08:00:00'
),
(
    6, 'DELL-KB216', 'Dell Wired Keyboard',
    NULL, NULL, 3, 'DANANGCENT',
    50, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-06 08:00:00'
),
(
    8, 'LOGI-K860', 'Logitech Ergo Keyboard',
    NULL, NULL, 3, 'DANANGCENT',
    30, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-08 08:00:00'
),
(
    10, 'LOGI-R500', 'Logitech Laser Presenter',
    NULL, NULL, 3, 'DANANGCENT',
    15, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-10 08:00:00'
),
(
    11, 'LOGI-H390', 'Logitech USB Headset',
    NULL, NULL, 3, 'DANANGCENT',
    40, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-11 08:00:00'
),
(
    15, 'CSCO-CB-10FT', 'Cisco Console Cable 10ft',
    NULL, NULL, 3, 'DANANGCENT',
    100, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-15 08:00:00'
),
(
    26, 'SAMS-T7-2TB', 'Samsung T7 Portable SSD',
    NULL, NULL, 3, 'DANANGCENT',
    60, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-26 08:00:00'
),
(
    12, 'LOGI-BOLT-RX', 'Logitech Bolt Receiver',
    NULL, NULL, 1, 'HCMEAST',
    200, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-12 08:00:00'
),
(
    12, 'LOGI-BOLT-RX', 'Logitech Bolt Receiver',
    NULL, NULL, 2, 'HANOINORTH',
    150, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-12 08:00:00'
),
(
    12, 'LOGI-BOLT-RX', 'Logitech Bolt Receiver',
    NULL, NULL, 3, 'DANANGCENT',
    50, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-12 08:00:00'
),
(
    17, 'CSCO-FP-1010', 'Cisco Firepower 1010',
    NULL, NULL, 2, 'HANOINORTH',
    5, 'IMPORT', 'COMPLETED',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    UNHEX('6EA1CA4094E1437FA386AB1A0F24C226'), 'Charlie Day',
    '2026-03-17 08:00:00'
),
(
    22, 'HMIL-FILE-2D', 'Tu Metal Filing Cabinet',
    NULL, NULL, 1, 'HCMEAST',
    10, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-22 08:00:00'
),
(
    23, 'HMIL-LOG-TRAY', 'HM Branded Desk Tray',
    NULL, NULL, 1, 'HCMEAST',
    100, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-23 08:00:00'
),
(
    24, 'HMIL-FLO-ARM', 'Flo Monitor Arm',
    NULL, NULL, 1, 'HCMEAST',
    12, 'IMPORT', 'COMPLETED',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    UNHEX('E01EEBB1AED44E27BC52517FE36F5A5D'), 'Bob Builder',
    '2026-03-24 08:00:00'
),
(
    28, 'SAMS-TAB-S8', 'Samsung Galaxy Tab S8',
    NULL, NULL, 3, 'DANANGCENT',
    15, 'IMPORT', 'COMPLETED',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    UNHEX('987574B4490B4CB8BB26DE659969274A'), 'Frank Reynolds',
    '2026-03-28 08:00:00'
);

INSERT INTO stock_movement (
    product_id, product_sku, product_name, 
    from_warehouse_id, from_warehouse_name, 
    to_warehouse_id, to_warehouse_name, 
    quantity, movement_type, status, 
    performed_by, performed_by_name, created_at
) VALUES
-- Internal Transfer: HCM to Da Nang
(7, 'LOGI-MX-MAS3', 'Logitech MX Master 3S', 
1, 'HCMEAST', 
3, 'DANANGCENT', 
5, 'TRANSFER', 'PENDING', 
UNHEX(REPLACE('e01eebb1-aed4-4e27-bc52-517fe36f5a5d', '-', '')), 'Bob Builder', '2026-04-10 10:00:00'),

-- Export: Shipping to a customer from Hanoi
(2, 'DELL-OPT-7090', 'Dell OptiPlex 7090 Micro', 
2, 'HANOINORTH', 
NULL, NULL, 
2, 'EXPORT', 'PENDING', 
UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', '')), 'Charlie Day', '2026-04-12 16:20:00'),

-- Adjustment: Damaged stock found in HCM
(27, 'SAMS-LS32', 'Samsung 32" Smart Monitor', 
1, 'HCMEAST', 
NULL, NULL, 
1, 'ADJUSTMENT', 'PENDING', 
UNHEX(REPLACE('e01eebb1-aed4-4e27-bc52-517fe36f5a5d', '-', '')), 'Bob Builder', '2026-04-14 09:45:00'),

-- Pending Import: New shipment arriving in Hanoi
(30, 'SAMS-RAM-32G', 'Samsung 32GB DDR5 RAM', 
NULL, NULL, 
2, 'HANOINORTH', 
50, 'IMPORT', 'PENDING', 
UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', '')), 'Charlie Day', '2026-04-18 10:00:00'),

-- In Review: Transfer request from Da Nang to HCM
(28, 'SAMS-TAB-S8', 'Samsung Galaxy Tab S8', 
3, 'DANANGCENT', 
1, 'HCMEAST', 
2, 'TRANSFER', 'PENDING', 
UNHEX(REPLACE('987574b4-490b-4cb8-bb26-de659969274a', '-', '')), 'Frank Reynolds', '2026-04-18 11:30:00'),

-- Failed Export: Shipping issue
(4, 'DELL-PWE-R750', 'Dell PowerEdge R750', 
2, 'HANOINORTH', 
NULL, NULL, 
1, 'EXPORT', 'PENDING', 
UNHEX(REPLACE('6ea1ca40-94e1-437f-a386-ab1a0f24c226', '-', '')), 'Charlie Day', '2026-04-17 14:00:00');

GRANT ALL PRIVILEGES ON auth.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON hr.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON catalog.* TO 'erp_user'@'%';
GRANT ALL PRIVILEGES ON inv.* TO 'erp_user'@'%';
