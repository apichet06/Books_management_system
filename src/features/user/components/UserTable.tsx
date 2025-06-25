import type { User } from "../types/user";
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';

import {
    Grid,
    IconButton
} from "@mui/material";
import { Edit, Delete, AddBox } from "@mui/icons-material";
import { fNumber } from "@/shared/utils/formatNumber";
import { useTranslation } from "react-i18next";

interface Props {
    users: User[];
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



export const UserTable = ({ users, onEdit, onDelete, onCreate, total, page, limit, loading, setPage, setLimit }: Props) => {

    const { t } = useTranslation();

    const columns: GridColDef[] = [
        {
            field: 'no',
            headerName: t('member.no'),
            width: 70,
            renderCell: (params: GridRenderCellParams) => {
                const sortedRowIds = params.api.getSortedRowIds();
                const rowIndex = sortedRowIds.indexOf(params.id);
                return fNumber(rowIndex + 1 + page * limit);
            },
        },

        {
            field: 'fullName',
            headerName: t('member.name'),
            sortable: false,
            width: 300,
            valueGetter: (_value, row) => `${row.tile || ''}${row.firstname || ''} ${row.lastname || ''}`,
        },
        { field: 'username', headerName: t('member.username'), width: 140 },
        { field: 'role', headerName: 'สถานะ', width: 100 },
        {
            field: 'actions',
            headerName: t('member.action'),
            width: 180,
            sortable: false,
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
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 9 }}>
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={users}
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
    );
}