import { Grid, IconButton } from "@mui/material";
import type { Book } from "../types/book";
import { AddBox, Delete, Edit } from "@mui/icons-material";
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { fNumber } from "@/shared/utils/formatNumber";
import DateLongTH from "@/shared/utils/handleDatetime";
import { useTranslation } from "react-i18next";


interface Props {
    book: Book[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onCreate: () => void;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
}

export default function BookTable({ book, total, page, limit, loading, onEdit, onDelete, onCreate, setPage, setLimit }: Props) {
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: 'no',
            headerName: t('book.no'),
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => {
                const sortedRowIds = params.api.getSortedRowIds();
                const rowIndex = sortedRowIds.indexOf(params.id);
                return fNumber(rowIndex + 1 + page * limit);
            },
        },
        { field: 'title', headerName: t('book.name'), width: 250 },
        { field: 'author', headerName: t('book.author'), width: 150 },
        { field: 'isbn', headerName: t('book.isbn'), width: 150 },
        {
            field: 'datetime',
            headerName: t('book.publishedDate'),
            width: 150,
            renderCell: (params) => (DateLongTH(params.row.publishedDate))
        },
        { field: 'description', headerName: t('book.description'), width: 300 },
        { field: 'category_Name', headerName: t('category.name'), width: 200 },
        {
            field: 'actions',
            headerName: t('book.action'),
            width: 150,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => onEdit(params.row.id)}>
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => onDelete(params.row.id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </>
            ),
        },
    ];



    return (
        <>
            <IconButton onClick={() => onCreate()}><AddBox /></IconButton>
            <hr />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={book}
                        columns={columns}
                        rowCount={total}
                        pagination
                        paginationMode="server"
                        pageSizeOptions={[5, 10, 20]}
                        paginationModel={{ page, pageSize: limit }}
                        onPaginationModelChange={({ page, pageSize }) => {
                            setPage(page);
                            setLimit(pageSize);
                        }}
                        loading={loading}
                    />
                </Grid>
            </Grid>
        </>
    )
}
