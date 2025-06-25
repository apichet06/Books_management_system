// features/auth/pages/LoginPage.tsx
import { Container, Typography, Box } from "@mui/material";
import { LoginForm } from "../components/LoginForm";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth="xl">
            <Box
                minHeight="75vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h4" gutterBottom>
                    {t('title')}
                </Typography>

                <Box width="30%">
                    <LoginForm />
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
