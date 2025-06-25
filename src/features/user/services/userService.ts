import type { User } from "../types/user";
import axios from "@/shared/utils/axiosInstance";

const getUsers = (page: number, limit: number) =>
  axios
    .get("/User/GetList", {
      params: { Page: page, Limit: limit },
    })
    .then((res) => {
      const result = res.data.result;
      return {
        data: result.data as User[],
        total: result.total,
        count: result.count,
      };
    });

const getUserInfo = (id: number) =>
  axios.get(`/User/GetInfo/${id}`).then((res) => res.data.result as User);

const createUser = (data: User) => axios.post("/User", data);
const updateUser = (data: User) => axios.put("/User", data);
const deleteUser = (id: number) => axios.delete(`/User/${id}`);

const userService = {
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
