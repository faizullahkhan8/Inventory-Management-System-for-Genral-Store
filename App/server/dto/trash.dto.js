export class TrashDto {
    constructor(data) {
        this.id = data._id;
        this.name = data.data.name;
        this.deletedOn = data.createdAt;
        this.deletedBy = data.deletedBy.username || "Unknown";
        this.type = data.collectionName;
    }
}
