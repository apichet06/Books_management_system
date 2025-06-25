import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { userSchema } from "../schema/userSchema";
import { SelectFieldHook, TextFieldHook } from "@/shared/components/hookform";
import type { User } from "../types/user";
import { useTranslation } from "react-i18next";

interface Props {
    defaultValues?: User;
    onSubmit: (data: User) => void;
    alertwaring?: string;
}

export const UserForm = ({ defaultValues, onSubmit, alertwaring }: Props) => {
    const methods = useForm<User>({
        defaultValues,
        resolver: yupResolver(userSchema),
    });

    const { t } = useTranslation();



    return (
        <FormProvider {...methods} >
            <Card sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 2 } }}>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3, xl: 3 }}>
                                <SelectFieldHook
                                    name="tile"
                                    label={t('member.prefix')}
                                    type="select"
                                    options={[
                                        { label: "นาย", value: "นาย" },
                                        { label: "นาง", value: "นาง" },
                                        { label: "นางสาว", value: "นางสาว" },
                                    ]}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                                <TextFieldHook name="firstname" label={t('member.firstname')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5, xl: 5 }}>
                                <TextFieldHook name="lastname" label={t('member.lastname')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: defaultValues?.id ? 12 : 6, xl: defaultValues?.id ? 12 : 6 }}>
                                <TextFieldHook name="username" label={t('member.username')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
                                {!defaultValues?.id && <TextFieldHook name="password" label={t('member.password')} disabled={true} defaultValue="123456" />}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <SelectFieldHook
                                    name="role"
                                    label={t('member.status')}
                                    type="select"
                                    options={[
                                        { label: "Admin", value: "admin" },
                                        { label: "User", value: "user" },
                                    ]}
                                />
                            </Grid>

                        </Grid>
                        <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }} >
                            {alertwaring && <Alert severity="warning" sx={{ minWidth: '80%' }}>{alertwaring}</Alert>}
                            <Button type="submit" variant="contained">{t('submit')}</Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>

        </FormProvider>
    );
};
