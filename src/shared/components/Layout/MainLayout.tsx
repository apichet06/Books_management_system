import { useAuthContext } from '@/shared/context/AuthContext';
import { useMemo } from 'react';
import { createTheme, } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Book, Category, KeyRounded, SupervisedUserCircle } from '@mui/icons-material';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';



const demoTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: { colorSchemeSelector: 'class' },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});
interface DashboardLayoutBasicProps {
    window?: () => Window;
}

export default function DashboardLayoutBasic({ window }: DashboardLayoutBasicProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const role = user?.role;

    const { t } = useTranslation();


    const NAVIGATION: Navigation = useMemo(() => {
        const base: Navigation = [
            { kind: 'header', title: t('menu.main_items') },
            { segment: 'dashboard', title: t('menu.dashboard'), icon: <DashboardIcon /> },
        ];

        if (role === 'admin') {
            base.push(
                { segment: 'users', title: t('menu.member'), icon: <SupervisedUserCircle /> },
                { segment: 'categories', title: t('menu.category'), icon: <Category /> },
                { segment: 'books', title: t('menu.book'), icon: <Book /> }
            );
        }

        if (role === 'user') {
            base.push({ segment: 'books', title: t('menu.book'), icon: <Book /> });
        }

        base.push(
            { kind: 'divider' },
            { kind: 'header', title: t('extra.header') },
            { segment: 'changpassword', title: t('extra.changepassword'), icon: <KeyRounded /> },
            { segment: 'logout', title: t('extra.logout'), icon: <LayersIcon /> }
        );

        return base;
    }, [role, t]);


    const router = useMemo(() => {
        return {
            pathname: location.pathname.replace(/^\//, ''),
            searchParams: new URLSearchParams(location.search),
            navigate: (path: string | URL) => navigate(path.toString()),
        };
    }, [location, navigate]);

    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout branding={{ title: t('title'), logo: <AutoStoriesIcon /> }} slots={{
                toolbarActions: () => (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </Box>
                )
            }}  >
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}


