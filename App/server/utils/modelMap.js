// utils/modelMap.js
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import User from "../models/user.model.js";
import Supplier from "../models/supplier.model.js";

export const modelMap = {
    products: Product,
    inventories: Inventory,
    users: User,
    suppliers: Supplier,
};
