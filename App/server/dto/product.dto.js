export default class ProductDto {
    constructor(product) {
        this._id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.isActive = product.isActive;
        this.imageUrl = product.imageUrl;
        this.customFields = product.customFields;
        this.inventoryId = product.inventoryId?._id;
        this.quantity = product.inventoryId?.quantity;
        this.minStock = product.inventoryId?.threshold;
        this.categoryName = product.categoryId?.name;
        this.categoryId = product.categoryId?._id;
    }
}
