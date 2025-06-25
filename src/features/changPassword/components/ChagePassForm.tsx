import { RHFPasswordInput } from "@/shared/components/hookform";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ChangPassword } from "../types/changePassword";
import { FormProvider, useForm } from "react-hook-form";
import { changPassword } from "../schema/changPasswordSchema";
import { useTranslation } from "react-i18next";


interface Props {
    defaultValues: ChangPassword;
    onSubmit: (data: ChangPassword) => void;
}

export default function ChagePassForm({ defaultValues, onSubmit }: Props) {
    const { t } = useTranslation();

    const methods = useForm<ChangPassword>({
        defaultValues: {
            ...defaultValues
        },
        resolver: yupResolver(changPassword),
    });
    return (
        <FormProvider {...methods} >
            <CardContent >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={2} >
                        <Card sx={{ width: '100%', maxWidth: 500, p: { xs: 1, sm: 2 } }}>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <RHFPasswordInput name="Password" label={t('extra.newpassword')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <RHFPasswordInput name="confirmPassword" label={t('extra.confirmpassword')} />
                            </Grid>
                            <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }} >
                                <Button type="submit" variant="contained">{t('submit')}</Button>
                                <Button type="button" variant="contained" color="secondary" onClick={() => methods.reset({ ...defaultValues })}

                                >{t('cancel')}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </form>
            </CardContent>
        </FormProvider>
    )
}
