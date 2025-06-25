import { FormProvider, useForm } from "react-hook-form";
import type { Book } from "../types/book";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookSchema } from "../schema/bookSchema";
import { Alert, Button, Card, CardActions, CardContent, Grid, } from "@mui/material";

import {
    TextFieldHook,
    ISBNFieldHook,
    AutocompleteHook,
    TextAreaHook,
    DatePickerHook,
} from "@/shared/components/hookform/";
import type { CategoryDropdown } from "@/features/category/types/category";
import { useTranslation } from "react-i18next";



interface Props {
    defaultValues?: Book;
    onSubmit: (data: Book) => void;
    alertwaring?: string;
    categoryDropdown: CategoryDropdown[]
}


export default function BookFrom({ defaultValues, onSubmit, alertwaring, categoryDropdown }: Props) {
    const { t } = useTranslation();

    const methods = useForm<Book>({
        defaultValues: {
            isbn: "",        // เพิ่มบรรทัดนี้
            ...defaultValues
        },
        resolver: yupResolver(bookSchema),
    });


    const categoryOptions = categoryDropdown.map((item) => ({
        label: item.name,
        value: item.id,
    }));


    return (
        <FormProvider {...methods} >
            <Card sx={{ width: '100%', maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 2 } }}>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
                                <AutocompleteHook name="categoryId" label={t('book.category')} options={categoryOptions} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                                <TextFieldHook name="title" label={t('book.name')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
                                <TextFieldHook name="author" label={t('book.author')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
                                <ISBNFieldHook name="isbn" label={t('book.isbn')} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <TextAreaHook name="description" label={t('book.description')} rows={3} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                <DatePickerHook name="publishedDate" label={t('book.publishedDate')} />
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
}
