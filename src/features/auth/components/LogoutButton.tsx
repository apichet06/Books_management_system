// src/features/auth/components/LogoutCard.tsx

import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { useLogout } from '../hooks/useLogout';
import { useTranslation } from 'react-i18next';

const LogoutButton: React.FC = () => {
    const logout = useLogout();
    const { t } = useTranslation();
    const handleConfirm = () => {
        logout();
    };

    const handleCancel = () => {
        // กลับไปหน้าอื่น หรือซ่อนไม่ให้ LogoutCard แสดงก็ได้
        window.history.back(); // หรือ navigate ไปหน้า dashboard ก็ได้
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <Card sx={{ minWidth: 400, p: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom textAlign={'center'}>
                        {t('extra.confirmlogout')}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleCancel} variant="outlined" color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="error">
                        {t('submit')}
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default LogoutButton;
