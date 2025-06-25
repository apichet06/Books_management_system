import { fNumber } from "@/shared/utils/formatNumber";
import type { Category } from "../types/category";
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, IconButton } from "@mui/material";
import { AddBox, Delete, Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";


interface Props {
    category: Category[];
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


export default function CategoryTable({ category, total, page, limit, loading, onEdit, onDelete, onCreate, setPage, setLimit }: Props) {
    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: 'no',
            headerName: t('category.no'),
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => {
                const sortedRowIds = params.api.getSortedRowIds();
                const rowIndex = sortedRowIds.indexOf(params.id);
                return fNumber(rowIndex + 1 + page * limit);
            },
        },
        { field: 'name', headerName: t('category.name'), width: 300 },
        {
            field: 'actions',
            headerName: t('category.action'),
            width: 200,
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
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 7 }}>
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={category}
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
