// useUserList.ts
import { useEffect, useState } from "react";
import bookService from "../services/bookService";
import type { Book } from "../types/book";

export const useBookList = () => {
    const [book, setBook] = useState<Book[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(true);

    const fetchBook = async (page: number = 0, limit: number = 5) => {
        setLoading(true);
        try {
            const res = await bookService.getBook(page, limit);
            setBook(res.data);
            setTotal(res.total); // ใช้สำหรับ DataGrid
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook(page, limit);
    }, [page, limit]);

    return {
        book,
        loading,
        total,
        page,
        limit,
        setPage,
        setLimit,
        refetch: () => fetchBook(page, limit),
    };
};
