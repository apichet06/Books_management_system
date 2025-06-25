import { useUserList } from "../hooks/useUserList";
import { UserTable } from "../components/UserTable";
import userService from "../services/userService";
import { UserForm } from "../components/UserForm";
import { Container, Typography, Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import type { User } from "../types/user";
import { alertDialog, confirmDialog } from "@/shared/components/ConfirmDialog";
import { useTranslation } from "react-i18next";

const defaultValues: User = {
    firstname: "",
    lastname: "",
    username: "",
    tile: "",
    role: "",
};

export const UserListPage = () => {

    const { t } = useTranslation();


    const { users, total, page, limit, setPage, setLimit, loading, refetch } = useUserList();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [alertwaring, setAlertwaring] = useState('');

    const handleCreate = () => {
        setOpen(true);
        setEditingUser(null);
        setAlertwaring('')
    }


    const handleEdit = (id: number) => {
        userService.getUserInfo(id).then((res: User) => {
            setEditingUser(res);
            setOpen(true);
            setAlertwaring('')
        });
    };



    const handleDelete = async (id: number) => {
        await confirmDialog(
            {
                title: "ลบผู้ใช้นี้หรือไม่?",
                text: "",
            },
            async () => {
                const response = await userService.deleteUser(id);
                await refetch();
                return response?.data?.message;
            }
        );
    };

    const handleSubmit = async (data: User) => {
        const req = data.id
            ? userService.updateUser(data)
            : userService.createUser(data);

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
        <Container>
            <Typography variant="h4" gutterBottom>{t("member.title")}</Typography>
            {!loading && (
                <UserTable
                    users={users}
                    total={total}
                    page={page}
                    limit={limit}
                    loading={loading}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    setPage={setPage}
                    setLimit={setLimit}
                />

            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editingUser?.id ? t('member.edit') : t('member.create')}</DialogTitle>
                <UserForm defaultValues={editingUser || defaultValues} onSubmit={handleSubmit} alertwaring={alertwaring} />
            </Dialog>
        </Container>
    );
};
