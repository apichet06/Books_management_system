import type { Book } from "../types/book";
import axios from "@/shared/utils/axiosInstance";

const getBook = (page: number, limit: number) =>
  axios
    .get("/Book/GetList", {
      params: { Page: page, Limit: limit },
    })
    .then((res) => {
      const result = res.data.result;
      return {
        data: result.data as Book[],
        total: result.total,
        count: result.count,
      };
    });

const getBookInfo = (id: number) =>
  axios.get(`/Book/GetInfo/${id}`).then((res) => res.data.result as Book);

const createBook = (data: Book) => axios.post("/Book", data);
const updateBook = (data: Book) => axios.put("/Book", data);
const deleteBook = (id: number) => axios.delete(`/Book/${id}`);

const bookService = {
  getBook,
  getBookInfo,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;
