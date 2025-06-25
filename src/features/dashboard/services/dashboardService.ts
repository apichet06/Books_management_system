import axiosInstance from "@/shared/utils/axiosInstance";
import type { Dashboard } from "../types/dashboard";

const getDashboardList = () =>
  axiosInstance.get("/Chart").then((res) => res.data.result as Dashboard[]);

export { getDashboardList };
