import { TextField, Button, Stack, CardContent, Grid, Card } from "@mui/material";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schema/loginSchema';
import type { LoginRequest } from '../types/auth';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/shared/context/AuthContext"; // ✅ นำเข้ามาใช้
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { setToken, setUser } = useAuthContext(); // ✅ ใช้ context
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema),
    });

    const { mutate, isPending } = useLogin((data) => {
        if (data.isSuccess) {
            setToken(data.token); // ✅ ใช้ context
            setUser(data.result);
            navigate("/dashboard");
        } else {
            setErrorMessage(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        }
    });

    const onSubmit = (data: LoginRequest) => {
        setErrorMessage(""); // เคลียร์ข้อความก่อน
        mutate(data);
    };

    return (
        <CardContent >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} >
                    <Card sx={{ width: '100%', maxWidth: 500, p: { xs: 1, sm: 2 } }}>
                        <Stack spacing={2}>
                            <TextField
                                label={t('auth.login.username')}
                                {...register("username")}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                            <TextField
                                label={t('auth.login.password')}
                                type="password"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <Button type="submit" variant="contained" disabled={isPending}>
                                {isPending ? t('auth.login.loadinglogin') : t('auth.login.title')}
                            </Button>
                            {errorMessage && (
                                <strong style={{ color: "red", textAlign: "center" }}>
                                    {errorMessage}
                                </strong>
                            )}
                        </Stack>
                    </Card>
                </Grid>
            </form >
        </CardContent >
    );
};
