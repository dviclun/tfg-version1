import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Components/auth/LoginPage/LoginPage';
import { RegisterPage } from './Components/auth/RegisterPage/RegisterPage';
import { LandingPage } from './Components/LandingPage/LandingPage';
import { AuthRoutes } from './Components/auth/AuthRoutes';

export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/login' element={
                    <AuthRoutes>
                        <LoginPage />
                    </AuthRoutes>
                } />

                <Route path='/register' element={
                    <AuthRoutes>
                        <RegisterPage />
                    </AuthRoutes>
                } />

                <Route path='/' exact element={<LandingPage />} />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    )
}
