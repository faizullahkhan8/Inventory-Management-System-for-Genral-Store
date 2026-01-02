export const authRoutes = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
};

export const productRoutes = {
    ADD_PRODUCT: "/product/create",
    UPLOAD_IMAGE: "/product/upload-image",
    GET_ALL: "/product/get-all",
    GET_SINGLE: "/product/get",
    UPDATE_PRODUCT: "/product/update",
    DELETE_PRODUCT: "/product/delete",
    RESTORE_PRODUCT: "/product/restore",
};

export const trashRoutes = {
    GET_ALL_TRASHED_ITEMS: "/trash/get-all",
    RESTORE_ONE_ITEM: "/trash/restore",
    DELETE_ONE_ITEM: "/trash/delete",
};

export const supplierRoutes = {
    GET_ALL_SUPPLIERS: "/supplier/get-all",
    CREATE_SUPPLIER: "/supplier/create",
    DELETE_SUPPLIER: "/supplier/delete",
    GET_SUPPLIER: "/supplier/get",
    UPDATE_SUPPLIER: "/supplier/update",
};

export const categoryRoutes = {
    GET_ALL_CATEGORY: "/category/get-all",
    ADD_CATEGORY: "/category/create",
    UPDATE_CATEGORY: "/category/update",
    DELETE_CATEGORY: "/category/delete",
};

export const billRoutes = {
    ADD_BILL: "/bill/create",
    GET_ALL_BILLS: "/bill/get-all",
    GET_SINGLE_BILL: "/bill/get",
    UPDATE_BILL: "/bill/update",
    DELETE_BILL: "/bill/delete",
};
