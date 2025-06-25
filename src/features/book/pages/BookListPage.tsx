import { useState } from "react";
import { useBookList } from "../hooks/useBookList";

import type { Book } from "../types/book";
import bookService from "../services/bookService";
import { Container, Dialog, DialogTitle, Typography } from "@mui/material";
import BookTable from "../components/BookTable";
import BookFrom from "../components/BookFrom";
import { alertDialog, confirmDialog } from "@/shared/components/ConfirmDialog";
import useCategoryDropdownList from "../hooks/useCategoryDropdownList";
import { useTranslation } from "react-i18next";


const defaultValues: Book = {
    title: '',
    author: '',
    isbn: '',
    publishedDate: undefined,
    categoryId: undefined,
    description: ''
};

export default function BookListPage() {

    const { t } = useTranslation();
    const { limit, book, loading, page, refetch, setLimit, setPage, total } = useBookList()
    const { categoryDropdown } = useCategoryDropdownList()
    const [editingBook, seteditingBook] = useState<Book | null>(null);
    const [open, setOpen] = useState(false);
    const [alertwaring, setAlertwaring] = useState('');


    const handleCreate = () => {
        setOpen(true);
        seteditingBook(null);
        setAlertwaring('');
    }

    const handleEdit = (id: number) => {
        bookService.getBookInfo(id).then((res: Book) => {
            seteditingBook(res);
            setAlertwaring('');
            setOpen(true);
        });
    };


    const handleDelete = async (id: number) => {
        await confirmDialog(
            {
                title: "ต้องการลบหนังสือหรือไม่",
                text: "",
            },
            async () => {
                const response = await bookService.deleteBook(id);
                await refetch();
                return response?.data?.message;
            }
        );
    };


    const handleSubmit = async (data: Book) => {
        const req = data.id
            ? bookService.updateBook(data)
            : bookService.createBook(data);

        try {
            const res = await req;

            if (!res.data.isSuccess) {
                setAlertwaring(res.data.message);
                return;
            }
            setOpen(false);
            await alertDialog(res.data.message, '', 'success');
            await refetch();
        } catch (err) {
            console.error(err);
            await alertDialog('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', 'error');
        }
    };


    return (
        <>
            <Container>
                <Typography variant="h4" gutterBottom>{t("book.title")}</Typography>
                {!loading && (
                    <BookTable
                        book={book}
                        total={total}
                        page={page}
                        limit={limit}
                        loading={loading}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        setPage={setPage}
                        setLimit={setLimit} />
                )}

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{editingBook?.id ? t("book.edit") : t("book.create")}</DialogTitle>
                    <BookFrom defaultValues={editingBook || defaultValues} onSubmit={handleSubmit}
                        alertwaring={alertwaring} categoryDropdown={categoryDropdown} />
                </Dialog>
            </Container>
        </>
    )
}
