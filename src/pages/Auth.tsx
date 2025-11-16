// #AUTH: Unified authentication page for login and registration
// #LOGIN: Email/Password and Google Sign-In authentication
// #REGISTER: User registration with validation
// #UI: Tab-based interface to switch between login and register
import { useState } from 'react';
import { LoginForm, RegisterForm } from '@src/components/auth';
import { Button } from '@src/components/ui';
import s from '@src/components/auth/style.module.css';

type AuthMode = 'login' | 'register';

export const Auth = () => {
    const [mode, setMode] = useState<AuthMode>('login'); // #STATE: Track current auth mode (login or register)

    return (
        <div className={s.authContainer}>
            <div className={s.authCard}>
                <div className={s.logoSection}>
                    <h1 className={s.welcomeText}>Login to </h1>
                    <h2 className={s.logo}>AI Model Inventory Manager!</h2>
                </div>

                <div className={s.tabsContainer}>
                    <Button
                        variant="ghost"
                        className={`${s.tab} ${mode === 'login' ? s.active : ''}`}
                        onClick={() => setMode('login')}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="ghost"
                        className={`${s.tab} ${mode === 'register' ? s.active : ''}`}
                        onClick={() => setMode('register')}
                    >
                        Register
                    </Button>
                </div>

                <div className={s.formContainer}>
                    {mode === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
                <div className={s.footer}>
                    <a href="/contact" className={s.footerLink}>Contact Us / Support</a>
                </div>
            </div>
        </div>
    );
};
