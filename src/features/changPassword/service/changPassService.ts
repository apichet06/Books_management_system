import axiosInstance from "@/shared/utils/axiosInstance";
import type { ChangPassword } from "../types/changePassword";

const updateChangPassword = (id: number | undefined, data: ChangPassword) =>
  axiosInstance.post(`/User/changpassword/${id}`, data);

export default updateChangPassword;

//
