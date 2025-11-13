// Layout Component - Main layout wrapper
import { Outlet } from 'react-router';
import { Footer, Header } from '.';
import { useAuth } from '@src/hooks';

export const Root = () => {
    const { user } = useAuth();

    return (
        <>
            <Header user={user} />
            <Outlet />
            <Footer />
        </>
    );
};
