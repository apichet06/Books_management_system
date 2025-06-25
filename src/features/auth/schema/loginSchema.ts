import * as yup from "yup";
import type { LoginRequest } from "../types/auth";

export const loginSchema: yup.ObjectSchema<LoginRequest> = yup.object({
  username: yup.string().required("กรุณากรอกชื่อผู้ใช้"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});
