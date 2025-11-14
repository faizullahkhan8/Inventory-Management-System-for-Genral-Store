export default class ProductDto {
    constructor(product) {
        this._id = product._id;
        this.name = product.name;
        this.sku = product.sku;
        this.description = product.description;
        this.purchasedPrice = product.purchasedPrice;
        this.sellingPrice = product.sellingPrice;
        this.mfgDate = product.mfgDate;
        this.expDate = product.expDate;
        this.isActive = product.isActive;
        this.imageUrl = product.imageUrl;
        this.customFields = product.customFields;
        // this.inventoryId = product.inventoryId._id;
        this.quantity = product.inventoryId.quantity;
        // this.supplierName = product.supplierId.name;
        // this.category = product.categoryId.name;
        this.lastUpdatd = product.updatedAt;
    }
}
