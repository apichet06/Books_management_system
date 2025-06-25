import type { Category } from '../types/category';
import { FormProvider, useForm } from 'react-hook-form';
import { categorySchema } from '../schema/categorySchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Card, CardActions, CardContent, Grid } from '@mui/material';
import { TextFieldHook } from '@/shared/components/hookform';
import { useTranslation } from 'react-i18next';


interface Props {
    defaultValues?: Category;
    onSubmit: (data: Category) => void;
    alertwaring?: string;
}


export default function CategoryForm({ defaultValues, onSubmit, alertwaring }: Props) {
    const { t } = useTranslation();
    const methods = useForm<Category>({
        defaultValues,
        resolver: yupResolver(categorySchema),
    });

    return (
        <FormProvider {...methods} >
            <Card sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 2 } }}>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <TextFieldHook name="name" label={t('category.name')} />
                            </Grid>
                        </Grid>
                        <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }} >
                            {alertwaring && <Alert severity="warning" sx={{ minWidth: '80%' }}>{alertwaring}</Alert>}
                            <Button type="submit" variant="contained">บันทึก</Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </FormProvider>
    );
}
