import { useState } from "react";
import CategoryTable from "../components/CategoryTable";
import { useCategoryList } from "../hooks/useCategoryList";
import categoryService from "../services/categoryService";
import type { Category } from "../types/category";
import { Container, Dialog, DialogTitle, Typography } from "@mui/material";
import CategoryForm from "../components/CategoryForm";
import { alertDialog, confirmDialog } from "@/shared/components/ConfirmDialog";
import { useTranslation } from "react-i18next";


const defaultValues: Category = {
    name: ""
};


export default function CategoryListPage() {

    const { t } = useTranslation();
    const { limit, category, loading, page, refetch, setLimit, setPage, total } = useCategoryList()
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [open, setOpen] = useState(false);
    const [alertwaring, setAlertwaring] = useState('');

    const handleCreate = () => {
        setOpen(true);
        setEditingCategory(null);
        setAlertwaring('');
    }

    const handleEdit = (id: number) => {
        categoryService.getCategoryInfo(id).then((res: Category) => {
            setEditingCategory(res);
            setAlertwaring('');
            setOpen(true);
        });
    };

    const handleDelete = async (id: number) => {
        await confirmDialog(
            {
                title: "ต้องการลบหมวดหมู่หนังสือหรือไม่",
                text: "",
            },
            async () => {
                const response = await categoryService.deleteCategory(id);
                await refetch();
                return response?.data?.message;
            }
        );
    };


    const handleSubmit = async (data: Category) => {
        const req = data.id
            ? categoryService.updateCategory(data)
            : categoryService.createCategory(data);

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
                <Typography variant="h4" gutterBottom>{t("category.title")}</Typography>
                {!loading && (
                    <CategoryTable
                        category={category}
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
                    <DialogTitle>{editingCategory?.id ? t("category.edit") : t("category.create")}</DialogTitle>
                    <CategoryForm defaultValues={editingCategory || defaultValues} onSubmit={handleSubmit} alertwaring={alertwaring} />
                </Dialog>
            </Container>

        </>
    )
}
