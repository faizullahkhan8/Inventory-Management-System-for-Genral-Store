import { model, Schema } from "mongoose";

const supplierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        company: { type: String, required: true, unique: true },

        email: String,

        contacts: [
            {
                type: {
                    type: String, // mobile, phone, whatsapp
                    required: true,
                },
                number: {
                    type: String,
                    required: true,
                },
            },
        ],

        address: { type: String },
    },
    { timestamps: true }
);

export default supplierSchema;
