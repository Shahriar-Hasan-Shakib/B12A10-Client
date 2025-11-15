// Layout Component - Main layout wrapper
import { Outlet, useNavigation } from 'react-router-dom';
import { Footer, Header } from '.';
import { useAuth } from '@src/hooks';
import { LoadingScreen } from '@src/components/ui/Loading';

export const Root = () => {
    const { user } = useAuth();
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';

    return (
        <>
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 z-50">
                    <div className="h-1 bg-primary animate-pulse">
                        <div className="h-full bg-primary-focus animate-[loading_1s_ease-in-out_infinite]"
                            style={{
                                width: '50%',
                                animation: 'loading 1s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>
            )}

            <Header user={user} />
            {isLoading ? <LoadingScreen /> : <Outlet />}
            <Footer />
        </>
    );
};
