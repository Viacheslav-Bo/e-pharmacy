import * as yup from "yup";

export const addSupplierSchema = yup.object({
  name: yup.string().trim().required("Supplier info is required"),
  address: yup.string().trim().required("Address is required"),
  suppliers: yup.string().trim().required("Company is required"),
  date: yup.string().required("Delivery date is required"),
  amount: yup
    .string()
    .required("Amount is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  status: yup.string().required("Status is required"),
});

export type AddSupplierFormValues = yup.InferType<typeof addSupplierSchema>;
