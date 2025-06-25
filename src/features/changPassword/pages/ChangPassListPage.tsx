import { Container, Typography } from "@mui/material";
import ChagePassForm from "../components/ChagePassForm";
import type { ChangPassword } from "../types/changePassword";
import updateChangPassword from "../service/changPassService";
import { confirmDialog } from "@/shared/components/ConfirmDialog";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useTranslation } from "react-i18next";

const DefaultValues: ChangPassword = {
    Password: '',
    confirmPassword: '',
}


export default function ChangPassListPage() {
    const { user } = useAuthContext();
    const { t } = useTranslation();

    const handleSubmit = async (data: ChangPassword) => {
        const id = user?.id
        delete data.confirmPassword
        await confirmDialog(
            {
                title: "ต้องการเปลี่ยนรหัสผ่านหรือไม่",
                text: "",
            },
            async () => {
                const response = await updateChangPassword(id, data);
                return response?.data?.message;
            }
        );
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>{t("extra.changepassword")}</Typography>
            <ChagePassForm onSubmit={handleSubmit} defaultValues={DefaultValues} />
        </Container>
    )
}
