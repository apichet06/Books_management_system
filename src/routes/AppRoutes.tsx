import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '@/features/auth/pages/LoginPage';
import { UserListPage } from '@/features/user/pages/UserListPage';
import CategoryPage from '@/features/category/pages/CategoryListPage';
import usePrivateRoute from '@/shared/hooks/usePrivateRoute';
import MainLayout from '@/shared/components/Layout/MainLayout';
import BookListPage from '@/features/book/pages/BookListPage';
import DashbordPage from '@/features/dashboard/pages/DashbordPage';
import LogoutButton from '@/features/auth/components/LogoutButton';
import ChangPassListPage from '@/features/changPassword/pages/changPassListPage';

export default function AppRoutes() {
    const isAuthenticated = usePrivateRoute();

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            {isAuthenticated ? (
                <Route element={<MainLayout />}>
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/books" element={<BookListPage />} />
                    <Route path="/dashbord" element={<DashbordPage />} />
                    <Route path="*" element={<Navigate to="/dashbord" />} />
                    <Route path="/logout" element={<LogoutButton />} />
                    <Route path='/changpassword' element={<ChangPassListPage />} />
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/dashbord" />} />
            )}
        </Routes>
    );
}