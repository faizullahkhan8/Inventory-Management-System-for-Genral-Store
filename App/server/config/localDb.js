import { createConnection, Schema as MongooseSchema } from "mongoose";
import productSchema from "../models/product.model.js";
import inventorySchema from "../models/inventory.model.js";
import supplierSchema from "../models/supplier.model.js";
import trashSchema from "../models/trash.model.js";
import userSchema from "../models/user.model.js";

let localDbConnection = null;

let localInventoryModel = null;
let localProductModel = null;
let localSupplierModel = null;
let localTrashModel = null;
let localUserModel = null;

export const createLocalConnection = async () => {
    localDbConnection = await createConnection(
        "mongodb://127.0.0.1:27017/InventoryManagmentSystem"
    ).asPromise();

    if (localDbConnection.host) {
        console.log(
            `App connected with host:${localDbConnection.host}:${localDbConnection.port} and DB:${localDbConnection.name}`
        );
    }

    localProductModel = localDbConnection.model("product", productSchema);
    localInventoryModel = localDbConnection.model("inventory", inventorySchema);
    localSupplierModel = localDbConnection.model("supplier", supplierSchema);
    localTrashModel = localDbConnection.model("trash", trashSchema);
    localUserModel = localDbConnection.model("user", userSchema);
};

export const getLocalInventoryModel = () => localInventoryModel || null;
export const getLocalProductModel = () => localProductModel || null;
export const getLocalSupplierModel = () => localSupplierModel || null;
export const getLocalTrashModel = () => localTrashModel || null;
export const getLocalUserModel = () => localUserModel || null;
