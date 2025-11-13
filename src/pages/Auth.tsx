import { useState } from 'react';
import { LoginForm, RegisterForm } from '@src/components/auth';
import styles from '@src/components/auth/style.module.css';

type AuthMode = 'login' | 'register';

export const Auth = () => {
    const [mode, setMode] = useState<AuthMode>('login');

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>ProHero</h1>
                    <h2 className={styles.welcomeText}>Welcome!</h2>
                </div>
                <div className={styles.tabsContainer}>
                    <button className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`} onClick={() => setMode('login')}>Sign In</button>
                    <button className={`${styles.tab} ${mode === 'register' ? styles.active : ''}`} onClick={() => setMode('register')}>Register</button>
                </div>
                <div className={styles.formContainer}>
                    {mode === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
                <div className={styles.footer}>
                    <a href="/contact" className={styles.footerLink}>Contact Us / Support</a>
                </div>
            </div>
        </div>
    );
};
