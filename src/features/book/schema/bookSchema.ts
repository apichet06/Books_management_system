import * as yup from "yup";
import type { Book } from "../types/book";

export const bookSchema: yup.ObjectSchema<Book> = yup.object({
  id: yup.number().optional(), // มักไม่ใส่ในฟอร์ม แต่ให้ optional
  title: yup.string().required("กรุณาระบุชื่อหนังสือ"),
  author: yup.string().required("กรุณาระบุชื่อผู้แต่ง"),
  isbn: yup
    .string()
    .required("กรุณากรอก ISBN")
    .test("is-valid-isbn", "ISBN ต้องมีเลขทั้งหมด 13 หลัก", (value) => {
      if (!value) return false;
      const digitsOnly = value.replace(/-/g, ""); // ลบขีดทั้งหมดออก
      return /^\d{13}$/.test(digitsOnly); // ตรวจสอบว่าเหลือแต่ตัวเลข 13 ตัว
    }),

  publishedDate: yup.date().required("กรุณาเลือกวันที่"),
  categoryId: yup.number().required("กรุณาเลือกหมวดหมู่"),
  description: yup.string().required("กรุณาระบุรายละเอียด"),
  category_Name: yup.string().optional(),
});
