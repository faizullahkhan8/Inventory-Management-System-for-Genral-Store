import * as Yup from "yup";

export const supplierValidationSchema = Yup.object({
    name: Yup.string().required("Supplier name is required"),
    company: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    totalAmount: Yup.number()
        .typeError("Total amount must be a number")
        .min(0, "Amount cannot be negative")
        .required("Total amount is required"),

    contacts: Yup.array()
        .of(
            Yup.object({
                type: Yup.string().required("Contact type required"),
                number: Yup.string().required("Contact number required"),
            })
        )
        .min(1, "At least one contact is required"),

    paymentSnapshots: Yup.array().of(
        Yup.object({
            amount: Yup.number()
                .typeError("Amount must be number")
                .positive("Amount must be positive")
                .required("Amount is required"),
            actionType: Yup.string()
                .oneOf(["purchase", "payment"])
                .required("Action required"),
            paymentMethod: Yup.string().required("Method required"),
        })
    ),
});
