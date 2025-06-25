// useUserList.ts
import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import type { Category } from "../types/category";

export const useCategoryList = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async (page: number = 0, limit: number = 5) => {
    setLoading(true);
    try {
      const res = await categoryService.getCategory(page, limit);
      setCategory(res.data);
      setTotal(res.total); // ใช้สำหรับ DataGrid
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory(page, limit);
  }, [page, limit]);

  return {
    category,
    loading,
    total,
    page,
    limit,
    setPage,
    setLimit,
    refetch: () => fetchCategory(page, limit),
  };
};
