import * as yup from "yup";

export const addProductSchema = yup.object({
  name: yup.string().trim().required("Product info is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .string()
    .required("Stock is required")
    .matches(/^\d+$/, "Stock must be a whole number"),
  suppliers: yup.string().trim().required("Suppliers is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid amount"),
});

export type AddProductFormValues = yup.InferType<typeof addProductSchema>;
