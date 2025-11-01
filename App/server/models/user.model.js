import { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        isActive: { type: Boolean, default: true },
        contactNo: { type: String, default: "" },
        permission: {
            managedashboard: { type: Boolean, default: true },
            manageUsers: { type: Boolean, default: true },
            manageProducts: { type: Boolean, default: true },
            manageSales: { type: Boolean, default: true },
            manageSuppliers: { type: Boolean, default: true },
            manageDues: { type: Boolean, default: true },
            manageReports: { type: Boolean, default: true },
            manageSettings: { type: Boolean, default: true },
        },
    },
    { timestamps: true }
);

userSchema.index({ username: 1 });

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = Model("User", userSchema);

export default User;
