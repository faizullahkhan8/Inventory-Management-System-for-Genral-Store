# Design Specification Document

# Inventory and Billing Management System for General Store

**Prepared by:** Faiz Ullah Khan  
**Document Date:** 2025-10-13  
**Version:** 1.0

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [References](#13-references)

2. [System Architecture](#2-system-architecture)
   - 2.1 [Architecture Overview](#21-architecture-overview)
   - 2.2 [Component Diagram](#22-component-diagram)
   - 2.3 [Deployment Model](#23-deployment-model)

3. [Database Design](#3-database-design)
   - 3.1 [Database Management System](#31-database-management-system)
   - 3.2 [Entity Relationship Diagram](#32-entity-relationship-diagram)
   - 3.3 [Table Definitions](#33-table-definitions)
   - 3.4 [Data Dictionary](#34-data-dictionary)
   - 3.5 [Database Optimization Strategy](#35-database-optimization-strategy)

4. [User Interface Design](#4-user-interface-design)
   - 4.1 [Design Principles](#41-design-principles)
   - 4.2 [Screen Layout Templates](#42-screen-layout-templates)
   - 4.3 [UI Component Library](#43-ui-component-library)
   - 4.4 [Navigation Map](#44-navigation-map)
   - 4.5 [Screen Mockups](#45-screen-mockups)

5. [Module Design](#5-module-design)
   - 5.1 [Product Management Module](#51-product-management-module)
   - 5.2 [Billing Module](#52-billing-module)
   - 5.3 [Inventory Management Module](#53-inventory-management-module)
   - 5.4 [Reporting Module](#54-reporting-module)
   - 5.5 [Supplier Management Module](#55-supplier-management-module)
   - 5.6 [User Authentication Module](#56-user-authentication-module)
   - 5.7 [Backup/Restore Module](#57-backuprestore-module)

6. [Process Flows](#6-process-flows)
   - 6.1 [Billing Process](#61-billing-process)
   - 6.2 [Inventory Update Process](#62-inventory-update-process)
   - 6.3 [Reporting Process](#63-reporting-process)
   - 6.4 [Backup Process](#64-backup-process)

7. [Data Flow Diagrams](#7-data-flow-diagrams)
   - 7.1 [Context Diagram](#71-context-diagram)
   - 7.2 [Level 1 DFD](#72-level-1-dfd)
   - 7.3 [Level 2 DFDs](#73-level-2-dfds)

8. [Security Design](#8-security-design)
   - 8.1 [Authentication Mechanism](#81-authentication-mechanism)
   - 8.2 [Data Protection](#82-data-protection)
   - 8.3 [Audit Trail](#83-audit-trail)

9. [Exception Handling](#9-exception-handling)
   - 9.1 [Error Categories](#91-error-categories)
   - 9.2 [Error Messages](#92-error-messages)
   - 9.3 [Recovery Procedures](#93-recovery-procedures)

10. [Testing Strategy](#10-testing-strategy)
    - 10.1 [Unit Testing](#101-unit-testing)
    - 10.2 [Integration Testing](#102-integration-testing)
    - 10.3 [System Testing](#103-system-testing)
    - 10.4 [User Acceptance Testing](#104-user-acceptance-testing)

11. [Implementation Plan](#11-implementation-plan)
    - 11.1 [Development Environment](#111-development-environment)
    - 11.2 [Technology Stack](#112-technology-stack)
    - 11.3 [Development Phases](#113-development-phases)
    - 11.4 [Deployment Strategy](#114-deployment-strategy)

12. [Appendices](#12-appendices)
    - 12.1 [Technical Libraries and Frameworks](#121-technical-libraries-and-frameworks)
    - 12.2 [API Specifications](#122-api-specifications)

## 1. Introduction

### 1.1 Purpose
This Design Specification Document provides the detailed technical design for the Inventory and Billing Management System as outlined in the Software Requirements Specification (SRS). It serves as a blueprint for developers to implement the system, covering architecture, database design, user interfaces, and all technical aspects needed for development.

### 1.2 Scope
This document covers the complete design of all system components including:
- System architecture and component relationships
- Database schema design
- User interface layouts and interactions
- Module specifications
- Process flows and data transformations
- Security implementation
- Testing approaches

The design focuses on a desktop application for Windows operating systems with a local database, designed for offline operation in a single-user environment.

### 1.3 References
- Software Requirements Specification for Inventory and Billing Management System v1.0
- Windows Desktop Application Design Guidelines
- SQL Database Best Practices

## 2. System Architecture

### 2.1 Architecture Overview
The system will be built using a three-tier architecture pattern:

1. **Presentation Layer**: Windows desktop application built with WPF (Windows Presentation Foundation)
2. **Business Logic Layer**: C# classes that implement the core functionality
3. **Data Access Layer**: Handles all database operations and abstracts the database from the business layer

This layered architecture allows for:
- Clear separation of concerns
- Easier maintenance and updates
- Future extensibility
- Testability of individual components

### 2.2 Component Diagram

```
┌───────────────────────────────────────────────────────────┐
│                   Presentation Layer                       │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Dashboard  │ │   Billing   │ │ Product Management  │   │
│ │    View     │ │    View     │ │        View         │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Inventory  │ │   Reports   │ │     Settings        │   │
│ │    View     │ │    View     │ │        View         │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                          │
                          │ MVVM Pattern
                          ▼
┌───────────────────────────────────────────────────────────┐
│                   Business Logic Layer                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Product    │ │   Billing   │ │ Inventory Manager   │   │
│ │  Manager    │ │   Engine    │ │                     │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Reporting  │ │  Supplier   │ │  Backup Manager     │   │
│ │   Engine    │ │  Manager    │ │                     │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                          │
                          │ Repository Pattern
                          ▼
┌───────────────────────────────────────────────────────────┐
│                   Data Access Layer                        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Product    │ │   Sales     │ │ Inventory Repository│   │
│ │ Repository  │ │ Repository  │ │                     │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│ │  Supplier   │ │    User     │ │  Settings Repository│   │
│ │ Repository  │ │ Repository  │ │                     │   │
│ └─────────────┘ └─────────────┘ └─────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                          │
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│                       SQLite Database                      │
└───────────────────────────────────────────────────────────┘
```

### 2.3 Deployment Model
The application will be deployed as a standalone Windows desktop application:

- **Installation**: Simple installer package (.msi) with database setup
- **Updates**: Manual update process with database migration capabilities
- **Local File Storage**: Application data stored in structured folders:
  - Database files in `%AppData%\StoreManager\Database\`
  - Configuration in `%AppData%\StoreManager\Config\`
  - Backups in user-selected location or `%AppData%\StoreManager\Backups\` by default
  - Logs in `%AppData%\StoreManager\Logs\`

## 3. Database Design

### 3.1 Database Management System
The system will use SQLite as the embedded database solution due to:
- Zero configuration required
- Self-contained in a single file
- No separate server installation
- Excellent performance for single-user applications
- Built-in backup capabilities
- Cross-platform compatibility if needed in the future

### 3.2 Entity Relationship Diagram

```
┌───────────────┐     ┌────────────────┐     ┌───────────────┐
│   Products    │     │ Product_Category│     │  Categories   │
├───────────────┤     ├────────────────┤     ├───────────────┤
│ product_id    │─┐   │ product_id     │◄──┐ │ category_id   │
│ name          │ │   │ category_id    │   └─│ name          │
│ description   │ └──►├────────────────┤     │ description   │
│ purchase_price│     └────────────────┘     └───────────────┘
│ selling_price │                      
│ quantity      │     ┌────────────────┐     ┌───────────────┐
│ unit          │  ┌─►│   Suppliers    │     │     Users     │
│ reorder_level │  │  ├────────────────┤     ├───────────────┤
│ mfg_date      │  │  │ supplier_id    │     │ user_id       │
│ exp_date      │  │  │ name           │     │ username      │
│ batch_number  │──┘  │ contact_person │     │ password_hash │
│ supplier_id   │     │ phone          │     │ last_login    │
│ image_path    │     │ email          │     │ is_active     │
└───────────────┘     │ address        │     └───────────────┘
       │              │ notes          │              
       │              └────────────────┘              
       │                                              
       │              ┌────────────────┐     ┌───────────────┐
       │              │  Sales_Header  │     │  Sales_Detail │
       │              ├────────────────┤     ├───────────────┤
       │              │ sale_id        │─┐   │ detail_id     │
       │              │ date_time      │ │   │ sale_id       │
       │              │ total_amount   │ └──►│ product_id    │◄──┐
       │              │ discount       │     │ quantity      │   │
       └──────────────│ tax            │     │ unit_price    │   │
                      │ net_amount     │     │ total_price   │   │
                      │ payment_method │     │ profit        │   │
                      │ user_id        │     └───────────────┘   │
                      └────────────────┘                         │
                               ▲                                 │
                               │                                 │
┌───────────────┐     ┌────────────────┐                        │
│ Inventory_Log │     │ Inventory_Adjust│                        │
├───────────────┤     ├────────────────┤                        │
│ log_id        │     │ adjust_id      │                        │
│ product_id    │◄────│ product_id     │◄─────────────────────┘
│ date_time     │     │ date_time      │
│ old_quantity  │     │ quantity_change│
│ new_quantity  │     │ reason         │
│ reason        │     │ user_id        │
│ reference_id  │     └────────────────┘
│ reference_type│
└───────────────┘
```

### 3.3 Table Definitions

#### Products Table
```sql
CREATE TABLE Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    purchase_price DECIMAL(10,2) NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 0,
    unit TEXT,
    reorder_level INTEGER,
    mfg_date DATE,
    exp_date DATE,
    batch_number TEXT,
    supplier_id INTEGER,
    image_path TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);
```

#### Categories Table
```sql
CREATE TABLE Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Product_Category Table
```sql
CREATE TABLE Product_Category (
    product_id INTEGER,
    category_id INTEGER,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
```

#### Suppliers Table
```sql
CREATE TABLE Suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_person TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Users Table
```sql
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Sales_Header Table
```sql
CREATE TABLE Sales_Header (
    sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT DEFAULT 'Cash',
    user_id INTEGER,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```

#### Sales_Detail Table
```sql
CREATE TABLE Sales_Detail (
    detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    profit DECIMAL(10,2),
    FOREIGN KEY (sale_id) REFERENCES Sales_Header(sale_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

#### Inventory_Adjust Table
```sql
CREATE TABLE Inventory_Adjust (
    adjust_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    quantity_change INTEGER NOT NULL,
    reason TEXT,
    user_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```

#### Inventory_Log Table
```sql
CREATE TABLE Inventory_Log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    old_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    reason TEXT,
    reference_id INTEGER,
    reference_type TEXT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

### 3.4 Data Dictionary

| Table | Column | Data Type | Description |
|-------|--------|-----------|-------------|
| Products | product_id | INTEGER | Unique identifier for products |
| Products | name | TEXT | Name of the product |
| Products | description | TEXT | Detailed description of the product |
| Products | purchase_price | DECIMAL | Cost price of the product |
| Products | selling_price | DECIMAL | Retail price of the product |
| Products | quantity | INTEGER | Current stock level |
| Products | unit | TEXT | Unit of measurement (e.g., kg, piece) |
| Products | reorder_level | INTEGER | Minimum quantity before reorder alert |
| Products | mfg_date | DATE | Manufacturing date |
| Products | exp_date | DATE | Expiration date |
| Products | batch_number | TEXT | Manufacturer batch number |
| Products | supplier_id | INTEGER | Foreign key to Suppliers table |
| Products | image_path | TEXT | Path to product image file |
| Products | is_active | BOOLEAN | Whether product is active in system |
| Products | created_at | DATETIME | Record creation timestamp |
| Products | updated_at | DATETIME | Record last update timestamp |

(Additional data dictionary entries would follow for all tables and columns)

### 3.5 Database Optimization Strategy

1. **Indexing Strategy**:
   - Create indexes on frequently queried columns:
     ```sql
     CREATE INDEX idx_product_name ON Products(name);
     CREATE INDEX idx_product_supplier ON Products(supplier_id);
     CREATE INDEX idx_sale_date ON Sales_Header(date_time);
     CREATE INDEX idx_inventory_product ON Inventory_Log(product_id);
     ```

2. **Query Optimization**:
   - Use prepared statements for all database operations
   - Implement parameterized queries to prevent SQL injection
   - Optimize JOIN operations with proper indexing
   - Implement database views for common complex queries

3. **Data Archiving**:
   - Implement archiving for sales data older than configured retention period
   - Archive tables maintain the same structure but hold historical data
   - Archive process runs during low-usage periods (configurable)

## 4. User Interface Design

### 4.1 Design Principles

1. **Simplicity First**
   - Clear, uncluttered layouts
   - Focus on essential information
   - Progressive disclosure of complex features

2. **Consistency**
   - Uniform control placement across all screens
   - Consistent color scheme and typography
   - Standard button sizes and placements

3. **Visual Hierarchy**
   - Important elements have visual prominence
   - Related items are visually grouped
   - Clear section separation with appropriate spacing

4. **Error Prevention**
   - Validate input as it's entered
   - Provide clear feedback on actions
   - Confirm destructive operations

5. **Accessibility**
   - High contrast between text and background
   - Readable font sizes (minimum 12pt)
   - Keyboard navigation support

### 4.2 Screen Layout Templates

Each screen in the application will follow one of these layout templates:

1. **Dashboard Layout**
```
┌─────────────────────────────────────────────────────────┐
│ Logo                                     User | Logout  │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│             │                                           │
│  Navigation │               Content Area                │
│    Menu     │                                           │
│             │                                           │
│             │                                           │
├─────────────┴───────────────────────────────────────────┤
│                        Status Bar                       │
└─────────────────────────────────────────────────────────┘
```

2. **Data Entry Layout**
```
┌─────────────────────────────────────────────────────────┐
│ Logo                                     User | Logout  │
├─────────────┬───────────────────────────────────────────┤
│             │ Form Title                  Actions       │
│             ├───────────────────────────────────────────┤
│  Navigation │                                           │
│    Menu     │               Form Fields                 │
│             │                                           │
│             │                                           │
│             ├───────────────────────────────────────────┤
│             │               Action Buttons              │
├─────────────┴───────────────────────────────────────────┤
│                        Status Bar                       │
└─────────────────────────────────────────────────────────┘
```

3. **List/Grid Layout**
```
┌─────────────────────────────────────────────────────────┐
│ Logo                                     User | Logout  │
├─────────────┬───────────────────────────────────────────┤
│             │ List Title                 Actions        │
│             ├───────────────────────────────────────────┤
│  Navigation │ Search/Filter Controls                    │
│    Menu     ├───────────────────────────────────────────┤
│             │                                           │
│             │          Data Grid / List View            │
│             │                                           │
│             ├───────────────────────────────────────────┤
│             │ Pagination                  Summary       │
├─────────────┴───────────────────────────────────────────┤
│                        Status Bar                       │
└─────────────────────────────────────────────────────────┘
```

### 4.3 UI Component Library

The application will use a consistent set of UI components:

1. **Input Controls**
   - Text Fields: For single-line text input
   - Number Fields: For numeric input with validation
   - Date Pickers: Calendar-style date selection
   - Dropdown Lists: For selection from predefined options
   - Search Fields: Text input with search functionality

2. **Information Display**
   - Data Grids: For tabular data display with sorting and filtering
   - Cards: For compact information display
   - Charts: For visual data representation
   - Status Indicators: To show state information

3. **Navigation**
   - Side Menu: Primary navigation between major functions
   - Tabs: Secondary navigation within a section
   - Breadcrumbs: For hierarchical navigation
   - Action Buttons: Consistent positioning and styling

4. **Notifications**
   - Alert Boxes: For important messages
   - Toast Notifications: For temporary feedback
   - Confirmation Dialogs: For validating user actions
   - Progress Indicators: For long-running operations

### 4.4 Navigation Map

```
┌───────────────┐
│   Dashboard   │
└───────┬───────┘
        │
┌───────┴───────┬────────────┬─────────────┬─────────────┬────────────┐
│               │            │             │             │            │
▼               ▼            ▼             ▼             ▼            ▼
┌───────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Products  │ │ Billing│ │Inventory│ │ Reports  │ │Suppliers │ │ Settings │
└─────┬─────┘ └───┬────┘ └────┬────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
      │          │           │           │            │            │
┌─────┴─────┐ ┌──┴────┐ ┌────┴────┐ ┌────┴─────┐ ┌────┴─────┐ ┌────┴─────┐
│Add Product│ │New Bill│ │  Stock  │ │  Sales  │ │   Add    │ │  User    │
│Edit Product│ │Bill List│ │ Adjust  │ │  Reports │ │ Supplier │ │ Profile  │
│List Products│└────────┘ │Low Stock│ │Inventory │ │Supplier  │ │ Backup   │
└───────────┘            │  History│ │  Reports │ │  List    │ │ Restore  │
                         └─────────┘ │Profit/Loss│└──────────┘ └──────────┘
                                     └──────────┘
```

### 4.5 Screen Mockups

(Detailed mockups for key screens would be included here)

1. **Dashboard Screen**
2. **Product Management Screen**
3. **Billing Screen**
4. **Inventory Management Screen**
5. **Reports Screen**

## 5. Module Design

### 5.1 Product Management Module

**Purpose**: Manage all aspects of product data and categorization.

**Key Classes**:
- `ProductManager`: Core business logic for product operations
- `Product`: Entity class representing a product
- `Category`: Entity class representing product categories
- `ProductRepository`: Data access for product operations
- `ProductViewModel`: Presentation model for product views

**Main Functions**:
1. `AddProduct(Product product)`: Add new product to inventory
2. `UpdateProduct(Product product)`: Update existing product details
3. `DeleteProduct(int productId)`: Mark product as inactive
4. `GetProductById(int productId)`: Retrieve specific product
5. `SearchProducts(string query)`: Search products by name/description
6. `GetLowStockProducts()`: Get products below reorder level
7. `AssignProductCategory(int productId, int categoryId)`: Categorize a product

**Events**:
- `ProductAdded`: Fired when new product is added
- `ProductUpdated`: Fired when product details change
- `ProductDeleted`: Fired when product is deleted
- `LowStockAlert`: Fired when product falls below reorder level

### 5.2 Billing Module

**Purpose**: Handle all sales transactions and billing operations.

**Key Classes**:
- `BillingEngine`: Core business logic for sales operations
- `Sale`: Entity class representing a complete sale
- `SaleItem`: Entity class representing individual item in a sale
- `SalesRepository`: Data access for sales operations
- `BillingViewModel`: Presentation model for billing view

**Main Functions**:
1. `CreateNewSale()`: Initialize a new sale transaction
2. `AddItemToSale(int saleId, int productId, int quantity)`: Add product to current sale
3. `RemoveItemFromSale(int saleId, int itemId)`: Remove item from current sale
4. `UpdateItemQuantity(int saleId, int itemId, int quantity)`: Change item quantity
5. `ApplyDiscount(int saleId, decimal discountAmount)`: Apply discount to sale
6. `CalculateTotals(int saleId)`: Calculate subtotal, tax, and final amount
7. `CompleteSale(int saleId, string paymentMethod)`: Finalize sale and process inventory
8. `PrintReceipt(int saleId)`: Generate printable receipt

**Events**:
- `SaleCreated`: Fired when new sale is created
- `SaleUpdated`: Fired when items are added/removed
- `SaleCompleted`: Fired when sale is finalized
- `InventoryChanged`: Fired when sale affects inventory levels

### 5.3 Inventory Management Module

**Purpose**: Track and manage product inventory levels.

**Key Classes**:
- `InventoryManager`: Core business logic for inventory operations
- `InventoryAdjustment`: Entity class for manual inventory changes
- `InventoryLog`: Entity class for tracking inventory history
- `InventoryRepository`: Data access for inventory operations
- `InventoryViewModel`: Presentation model for inventory views

**Main Functions**:
1. `AdjustInventory(int productId, int quantityChange, string reason)`: Manual inventory adjustment
2. `GetInventoryHistory(int productId)`: Retrieve inventory history for product
3. `LogInventoryChange(int productId, int oldQty, int newQty, string reason)`: Record changes
4. `CheckLowStockItems()`: Identify items below reorder level
5. `GetExpiringItems(int daysThreshold)`: Find items nearing expiration
6. `ReconcileInventory(Dictionary<int, int> actualCounts)`: Update inventory after physical count

**Events**:
- `InventoryAdjusted`: Fired when manual adjustment occurs
- `LowStockDetected`: Fired when item falls below threshold
- `ExpiryApproaching`: Fired when items are nearing expiry date

### 5.4 Reporting Module

**Purpose**: Generate business reports and analytics.

**Key Classes**:
- `ReportingEngine`: Core business logic for report generation
- `ReportParameters`: Entity class for report configuration
- `Report`: Entity class representing a generated report
- `ReportData`: Entity class for report data structure
- `ReportViewModel`: Presentation model for report views

**Main Functions**:
1. `GenerateSalesReport(DateTime startDate, DateTime endDate)`: Create sales report
2. `GenerateProfitReport(DateTime startDate, DateTime endDate)`: Create profit/loss report
3. `GenerateInventoryReport()`: Create current inventory status report
4. `GenerateProductPerformanceReport()`: Analyze product sales performance
5. `ExportReportToPdf(Report report)`: Export report to PDF format
6. `ExportReportToExcel(Report report)`: Export report to Excel format

**Events**:
- `ReportGenerated`: Fired when report creation completes
- `ExportCompleted`: Fired when report export finishes

### 5.5 Supplier Management Module

**Purpose**: Manage supplier information and relationships.

**Key Classes**:
- `SupplierManager`: Core business logic for supplier operations
- `Supplier`: Entity class representing a supplier
- `SupplierRepository`: Data access for supplier operations
- `SupplierViewModel`: Presentation model for supplier views

**Main Functions**:
1. `AddSupplier(Supplier supplier)`: Add new supplier
2. `UpdateSupplier(Supplier supplier)`: Update supplier details
3. `DeleteSupplier(int supplierId)`: Mark supplier as inactive
4. `GetSupplierById(int supplierId)`: Retrieve specific supplier
5. `GetProductsBySupplier(int supplierId)`: List products from specific supplier
6. `SearchSuppliers(string query)`: Search suppliers by name/contact

**Events**:
- `SupplierAdded`: Fired when new supplier is added
- `SupplierUpdated`: Fired when supplier details change
- `SupplierDeleted`: Fired when supplier is deleted

### 5.6 User Authentication Module

**Purpose**: Handle user authentication and security.

**Key Classes**:
- `AuthenticationManager`: Core business logic for authentication
- `User`: Entity class representing system user
- `UserRepository`: Data access for user operations
- `LoginViewModel`: Presentation model for login view

**Main Functions**:
1. `AuthenticateUser(string username, string password)`: Validate user credentials
2. `ChangePassword(int userId, string oldPassword, string newPassword)`: Update password
3. `GetCurrentUser()`: Get currently logged-in user
4. `LogUserActivity(int userId, string activity)`: Track user actions
5. `LogoutUser()`: End user session

**Events**:
- `UserLoggedIn`: Fired on successful authentication
- `UserLoggedOut`: Fired when user logs out
- `PasswordChanged`: Fired when password is updated
- `AuthenticationFailed`: Fired on failed login attempt

### 5.7 Backup/Restore Module

**Purpose**: Manage system data backup and restoration.

**Key Classes**:
- `BackupManager`: Core business logic for backup operations
- `BackupJob`: Entity class representing a backup operation
- `RestoreJob`: Entity class representing a restore operation
- `BackupViewModel`: Presentation model for backup views

**Main Functions**:
1. `CreateBackup(string destination)`: Create database backup
2. `RestoreFromBackup(string backupFile)`: Restore system from backup
3. `ScheduleAutomaticBackup(TimeSpan interval)`: Configure scheduled backups
4. `GetBackupHistory()`: List previous backup operations
5. `ValidateBackupFile(string backupFile)`: Check backup file integrity

**Events**:
- `BackupStarted`: Fired when backup begins
- `BackupCompleted`: Fired when backup finishes
- `RestoreStarted`: Fired when restore begins
- `RestoreCompleted`: Fired when restore finishes

## 6. Process Flows

### 6.1 Billing Process

```
┌─────────┐     ┌──────────────┐     ┌───────────────┐
│  Start  │────►│ Create New   │────►│ Add Items to  │
└─────────┘     │   Sale       │     │    Sale       │
                └──────────────┘     └───────┬───────┘
                                             │
                ┌──────────────┐     ┌───────▼───────┐
                │  Complete    │◄────┤  Calculate    │
                │    Sale      │     │   Totals      │
                └───────┬──────┘     └───────────────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
┌───────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
│ Print Receipt │ │Update Inventory│ │Record Sale in │
└───────┬──────┘ └──────┬───────┘ │   Database   │
        │               │         └──────────────┘
        │               │
┌───────▼──────┐ ┌──────▼───────┐
│ Give Receipt │ │ Update Sales │
│ to Customer  │ │   Reports    │
└──────────────┘ └──────────────┘
```

### 6.2 Inventory Update Process

```
┌─────────┐     ┌──────────────┐              ┌───────────────┐
│  Start  │────►│  Inventory   │──Manual─────►│ Enter Quantity│
└─────────┘     │ Update Source│              │ Adjustment    │
                └──────┬───────┘              └───────┬───────┘
                       │                              │
                       │                              ▼
                       │                      ┌───────────────┐
                       │                      │ Enter Reason  │
                       │                      │ for Change    │
                       │                      └───────┬───────┘
                       │                              │
                       │                              ▼
                       │                      ┌───────────────┐
                       │                      │   Validate    │
                       │                      │  Adjustment   │
                       │                      └───────┬───────┘
                       │                              │
                       ▼                              ▼
                ┌──────────────┐             ┌────────────────┐
                │ Sale Process │────────────►│Update Product  │
                └──────────────┘             │   Quantity     │
                                             └───────┬────────┘
                                                     │
                                                     ▼
                                             ┌────────────────┐
                                             │Record in       │
                                             │Inventory Log   │
                                             └───────┬────────┘
                                                     │
                                                     ▼
                                             ┌────────────────┐
                                             │Check for Low   │
                                             │Stock Condition │
                                             └───────┬────────┘
                                                     │
                                             ┌───────▼────────┐
                                             │ Generate Alert │
                                             │  (if needed)   │
                                             └────────────────┘
```

### 6.3 Reporting Process

```
┌─────────┐     ┌──────────────┐     ┌───────────────┐
│  Start  │────►│ Select Report│────►│ Select Report │
└─────────┘     │    Type      │     │  Parameters   │
                └──────────────┘     └───────┬───────┘
                                             │
                                     ┌───────▼───────┐
                                     │   Generate    │
                                     │    Report     │
                                     └───────┬───────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        │                    │                    │
                ┌───────▼──────┐     ┌──────▼───────┐     ┌──────▼──────┐
                │ View Report  │     │ Print Report │     │Export Report │
                │  on Screen   │     │              │     │              │
                └──────────────┘     └──────────────┘     └──────────────┘
```

### 6.4 Backup Process

```
┌─────────┐     ┌──────────────┐     ┌───────────────┐
│  Start  │────►│Select Backup │────►│ Choose Backup │
└─────────┘     │    Type      │     │  Destination  │
                └──────────────┘     └───────┬───────┘
                                             │
                                     ┌───────▼───────┐
                                     │  Validate     │
                                     │ Destination   │
                                     └───────┬───────┘
                                             │
                                     ┌───────▼───────┐
                                     │  Perform      │
                                     │   Backup      │
                                     └───────┬───────┘
                                             │
                        ┌────────────────────┼────────────────┐
                        │                    │                │
                ┌───────▼──────┐     ┌──────▼───────┐ ┌──────▼──────┐
                │Verify Backup │     │Record Backup │ │Show Success │
                │ (optional)   │     │in Log        │ │  Message    │
                └──────────────┘     └──────────────┘ └─────────────┘
```

## 7. Data Flow Diagrams

### 7.1 Context Diagram

```
                       ┌───────────────┐
                       │               │
        Product Data   │               │  Billing Information
      ┌───────────────►│   Inventory   ├───────────────┐
      │                │      and      │               │
      │                │    Billing    │               │
      │                │    System     │               │
      │                │               │               │
      │                └───┬─────┬─────┘               │
      │                    │     │                     │
      │                    │     │                     │
      │                    │     │                     │
      │                    │     │                     │
┌─────▼─────┐        ┌─────▼─────▼─┐            ┌─────▼─────┐
│           │        │             │            │           │
│  Supplier │        │    Store    │            │ Customer  │
│           │        │   Operator  │            │           │
└───────────┘        └─────────────┘            └───────────┘
```

### 7.2 Level 1 DFD

```
┌───────────┐    Add/Update    ┌───────────┐
│           │◄───────────────►│           │
│  Product  │                  │   User    │
│ Management│    Product Data  │ Interface │
│           │                  │           │
└─────┬─────┘                  └───┬───────┘
      │                            │
      │                            │
      │                            │
      │         ┌──────────────┐   │
      │         │              │   │
      └────────►│  Database    │◄──┘
                │              │
                └──────┬───────┘
                       │
                       │
┌───────────┐          │          ┌───────────┐
│           │◄─────────┘          │           │
│ Inventory │   Inventory Data    │  Billing  │
│ Management│◄──────────────────►│  Module   │
│           │                     │           │
└────┬──────┘                     └─────┬─────┘
     │                                  │
     │                                  │
     │                                  │
     │        ┌────────────┐            │
     │        │            │            │
     └───────►│  Reporting │◄───────────┘
              │   Module   │
              │            │
              └────────────┘
```

### 7.3 Level 2 DFDs

(Additional detailed DFDs would be included for each major subsystem)

## 8. Security Design

### 8.1 Authentication Mechanism

1. **Password Authentication**
   - Bcrypt hashing algorithm for password storage
   - Minimum password strength requirements enforced
   - Account lockout after multiple failed attempts
   - Password change forced on first login

2. **Session Management**
   - Session timeout after 30 minutes of inactivity (configurable)
   - Single active session per user
   - Session invalidation on application exit

### 8.2 Data Protection

1. **Database Security**
   - Encrypted database file
   - Parameterized queries to prevent SQL injection
   - Restricted file system permissions for database files

2. **Application Data**
   - Configuration settings stored securely
   - Sensitive data (connection strings, etc.) encrypted
   - Secure temporary file handling

### 8.3 Audit Trail

1. **User Activity Logging**
   - Login/logout events recorded
   - Critical operations logged (sales, inventory adjustments)
   - Audit trail for security-sensitive operations

2. **System Event Logging**
   - Application start/stop events
   - Error conditions and exceptions
   - Backup/restore operations

## 9. Exception Handling

### 9.1 Error Categories

1. **User Input Errors**
   - Invalid data entry
   - Business rule violations
   - Missing required fields

2. **System Errors**
   - Database connectivity issues
   - File I/O problems
   - Resource constraints

3. **Business Logic Errors**
   - Inventory discrepancies
   - Calculation errors
   - Process violations

### 9.2 Error Messages

Error messages will follow these guidelines:
- Clear, non-technical language
- Actionable information when possible
- Error codes for technical support reference
- Visual indication of error severity

Example error messages:
- "Product quantity must be a positive number. Please correct the value."
- "Unable to connect to the database. Please restart the application."
- "Insufficient stock available for [Product Name]. Only [X] items remain."

### 9.3 Recovery Procedures

1. **Data Validation Recovery**
   - Highlight invalid fields
   - Preserve valid user input
   - Provide clear correction instructions

2. **System Error Recovery**
   - Automatic retry for transient failures
   - Safe application state preservation
   - Clear path to resume operation

3. **Database Error Recovery**
   - Transaction rollback on failure
   - Automatic reconnection attempts
   - Data consistency checks on reconnection

## 10. Testing Strategy

### 10.1 Unit Testing

1. **Scope**:
   - Business logic components
   - Calculation algorithms
   - Data access methods
   - Individual UI controls

2. **Approach**:
   - Automated unit tests using MSTest/NUnit
   - Test-driven development where appropriate
   - Mocking of dependencies

3. **Coverage Goals**:
   - 80% code coverage for business logic
   - 100% coverage for critical calculations
   - All exception paths tested

### 10.2 Integration Testing

1. **Scope**:
   - Component interaction testing
   - Database operations
   - Module interfaces
   - Event propagation

2. **Approach**:
   - Test harnesses for component integration
   - Database integration with test data
   - Event handling verification

3. **Focus Areas**:
   - Billing to inventory integration
   - Reporting system data accuracy
   - Database transaction integrity

### 10.3 System Testing

1. **Scope**:
   - End-to-end workflows
   - Performance testing
   - Stability testing
   - Recovery testing

2. **Approach**:
   - Manual test scripts
   - Simulated real-world scenarios
   - Stress testing under load

3. **Scenarios**:
   - Complete sales process
   - Daily operations sequence
   - Monthly/yearly reporting cycles
   - Backup and restore operations

### 10.4 User Acceptance Testing

1. **Scope**:
   - Business requirements validation
   - Usability evaluation
   - Real-world scenario testing

2. **Approach**:
   - Guided testing with actual users
   - Predefined test scripts
   - Observation and feedback collection

3. **Success Criteria**:
   - All critical business functions work correctly
   - Users can complete tasks independently
   - Performance meets expectations
   - No blocking issues discovered

## 11. Implementation Plan

### 11.1 Development Environment

1. **Development Tools**:
   - Visual Studio 2022
   - .NET 6.0 Framework
   - SQL Management tools
   - Git for version control

2. **Development Practices**:
   - Feature branching workflow
   - Code review process
   - Continuous integration
   - Static code analysis

### 11.2 Technology Stack

1. **Application Framework**:
   - WPF (Windows Presentation Foundation)
   - .NET 6.0 (or latest LTS)
   - MVVM architectural pattern

2. **Database Technology**:
   - SQLite for data storage
   - Entity Framework Core for ORM
   - Dapper for performance-critical queries

3. **User Interface**:
   - Material Design-inspired UI
   - WPF control libraries
   - Custom control templates

4. **Reporting**:
   - Local report generation
   - PDF export capability
   - Excel data export

### 11.3 Development Phases

1. **Phase 1: Core System** (4 weeks)
   - Database schema implementation
   - Product management module
   - Basic inventory functionality
   - User authentication

2. **Phase 2: Sales Functions** (3 weeks)
   - Billing module
   - Sales reporting
   - Inventory integration
   - Receipt printing

3. **Phase 3: Complete Inventory** (2 weeks)
   - Full inventory management
   - Stock adjustments
   - Low stock alerts
   - Supplier management

4. **Phase 4: Reporting & Utilities** (3 weeks)
   - Complete reporting system
   - Data backup/restore
   - System configuration
   - Performance optimization

5. **Phase 5: Testing & Refinement** (2 weeks)
   - System testing
   - User acceptance testing
   - Bug fixing
   - Performance tuning

### 11.4 Deployment Strategy

1. **Installation Package**:
   - Windows installer (.msi) package
   - Automatic database creation
   - Default configuration setup
   - Desktop shortcut creation

2. **Initial Deployment**:
   - On-site installation
   - Initial data setup
   - User training session
   - Configuration to local requirements

3. **Post-Deployment Support**:
   - 2 weeks of direct support
   - Issue resolution protocol
   - Remote assistance capability
   - Feedback collection for improvements

## 12. Appendices

### 12.1 Technical Libraries and Frameworks

1. **UI Frameworks**:
   - MaterialDesignInXaml (UI components)
   - Extended WPF Toolkit (advanced controls)
   - WPF Animated GIF (for loading animations)

2. **Data Access**:
   - System.Data.SQLite (SQLite provider)
   - EntityFrameworkCore.SQLite (ORM)
   - Dapper (micro-ORM for performance)

3. **Reporting**:
   - IronPDF (PDF generation)
   - EPPlus (Excel export)
   - OxyPlot (charts and graphs)

4. **Utilities**:
   - Serilog (logging framework)
   - AutoMapper (object mapping)
   - FluentValidation (input validation)
   - Newtonsoft.Json (data serialization)

### 12.2 API Specifications

1. **Database Access Layer API**
2. **Business Logic Layer API**
3. **Report Generation API**
4. **Printing Subsystem API**