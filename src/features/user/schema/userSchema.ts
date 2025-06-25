import * as yup from "yup";
import type { User } from "../types/user";

export const userSchema: yup.ObjectSchema<User> = yup.object({
  id: yup.number().optional(), // มักไม่ใส่ในฟอร์ม แต่ให้ optional
  role: yup.string().required("กรุณาระบุสถานะผู้ใช้"),
  tile: yup.string().required("กรุณาระบุคำนำหน้าชื่อ"),
  firstname: yup.string().required("กรุณาระบุชื่อ"),
  lastname: yup.string().required("กรุณาระบุนามสกุล"),
  username: yup.string().required("กรุณาระบุชื่อผู้ใช้"),
  password: yup.string().optional(),
});
