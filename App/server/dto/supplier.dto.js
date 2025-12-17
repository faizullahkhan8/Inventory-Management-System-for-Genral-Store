export class SupplerDto {
    constructor(supplier) {
        this._id = supplier._id;
        this.name = supplier.name;
        this.company = supplier.company;
        this.phone = supplier.contacts[0].number;
        this.email = supplier.email;
        this.paidAmount = supplier.paidAmount || 0;
        this.totalAmount = supplier.totalAmount || 0;
        this.remainingAmount =
            Number(supplier.totalAmount) - Number(supplier.paidAmount) || 0;
        this.lastPurchaseDate =
            supplier.paymentSnapshots[
                supplier.paymentSnapshots.length - 1
            ]?.timestamp;
    }
}
