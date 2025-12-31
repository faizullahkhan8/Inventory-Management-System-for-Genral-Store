export class SupplerDto {
    constructor(supplier) {
        this._id = supplier._id;
        this.name = supplier.name;
        this.company = supplier.company;
        this.address = supplier.address;
        this.contacts = supplier.contacts;
    }
}
