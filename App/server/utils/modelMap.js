// utils/modelMap.js
import {
    getLocalProductModel,
    getLocalInventoryModel,
    getLocalUserModel,
    getLocalSupplierModel,
    getLocalCategoryModel,
    getLocalBillModel,
} from "../config/localDb.js";

export const modelMap = {
    products: getLocalProductModel,
    inventories: getLocalInventoryModel,
    users: getLocalUserModel,
    suppliers: getLocalSupplierModel,
    categories: getLocalCategoryModel,
    bills: getLocalBillModel,
};
