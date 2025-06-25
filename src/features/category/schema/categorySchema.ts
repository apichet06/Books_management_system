import * as yup from "yup";
import type { Category } from "../types/category";

export const categorySchema: yup.ObjectSchema<Category> = yup.object({
  id: yup.number().optional(), // มักไม่ใส่ในฟอร์ม แต่ให้ optional
  name: yup.string().required("กรุณานระบุชื่อหมวดหมู่"),
});
