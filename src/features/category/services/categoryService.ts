import type { Category, CategoryDropdown } from "../types/category";
import axios from "@/shared/utils/axiosInstance";

const getCategory = (page: number, limit: number) =>
  axios
    .get("/Category/GetList", {
      params: { Page: page, Limit: limit },
    })
    .then((res) => {
      const result = res.data.result;
      return {
        data: result.data as Category[],
        total: result.total,
        count: result.count,
      };
    });

const getCategoryInfo = (id: number) =>
  axios
    .get(`/Category/GetInfo/${id}`)
    .then((res) => res.data.result as Category);
const getBookDropdonwList = () =>
  axios
    .get("/Category/GetDopdownList")
    .then((res) => res.data.result as CategoryDropdown[]);

const createCategory = (data: Category) => axios.post("/Category", data);
const updateCategory = (data: Category) => axios.put("/Category", data);
const deleteCategory = (id: number) => axios.delete(`/Category/${id}`);

const categoryService = {
  getCategory,
  getCategoryInfo,
  createCategory,
  updateCategory,
  deleteCategory,
  getBookDropdonwList,
};

export default categoryService;
