export const authRoutes = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
};

export const productRoutes = {
    ADD_PRODUCT: "/product/create",
    UPLOAD_IMAGE: "/product/upload-image",
    GET_ALL_FOR_TABLE: "/product/get-all-for-table",
    GET_SINGLE_FOR_VIEW: "/product/get-product-for-view",
    GET_SINGLE_FOR_EDIT: "/product/get-product-for-edit",
    UPDATE_PRODUCT: "/product/update-product",
    DELETE_PRODUCT: "/product/delete",
    RESTORE_PRODUCT: "/product/restore",
};

export const trashRoutes = {
    GET_ALL_TRASHED_ITEMS: "/trash/get-all",
    RESTORE_ONE_ITEM: "/trash/restore",
    DELETE_ONE_ITEM: "/trash/delete",
};
