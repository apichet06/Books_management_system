// useUserList.ts
import { useEffect, useState } from "react";
import userService from "../services/userService";
import type { User } from "../types/user";

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (page: number = 0, limit: number = 5) => {
    setLoading(true);
    try {
      const res = await userService.getUsers(page, limit);
      setUsers(res.data);
      setTotal(res.total); // ใช้สำหรับ DataGrid
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  return {
    users,
    loading,
    total,
    page,
    limit,
    setPage,
    setLimit,
    refetch: () => fetchUsers(page, limit),
  };
};
