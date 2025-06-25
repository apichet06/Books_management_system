import * as yup from "yup";
import type { ChangPassword } from "../types/changePassword";

export const changPassword: yup.ObjectSchema<ChangPassword> = yup.object({
  id: yup.number().optional(),
  Password: yup
    .string()
    .required("กรุณาระบุรหัสผ่านใหม่")
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    .matches(/[a-z]/, "ต้องมีตัวอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
    .matches(/[A-Z]/, "ต้องมีตัวอักษรตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว"),
  confirmPassword: yup
    .string()
    .required("กรุณายืนยันรหัสผ่านใหม่")
    .test("passwords-match", "รหัสผ่านไม่ตรงกัน", function (value) {
      return value === this.parent.Password;
    }),
});
