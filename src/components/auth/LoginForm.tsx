import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@src/hooks';
import { HOME } from '@src/constants/routes';
import { GoogleIcon, EnvelopeIcon, LockIcon, EyeIcon, EyeSlashIcon, ErrorIcon, ArrowLeft } from '@src/assets/icons';
import { Button } from '@src/components/ui';
import styles from './style.module.css';

export const LoginForm = () => {
    const navigate = useNavigate();
    const from = useLocation().state?.from?.pathname || HOME; 
    const { signIn, signInWithGoogle } = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError('');
            await signInWithGoogle();
            navigate(from);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            await signIn(formData);
            navigate(from);
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    if (!showEmailForm) {
        return (
            <div>
                <div className={styles.socialButtons}>
                    <Button
                        type="button"
                        variant="outline"
                        className={styles.socialButton}
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <GoogleIcon />Sign in with Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={styles.socialButton}
                        onClick={() => setShowEmailForm(true)}
                    >
                        <EnvelopeIcon />Sign in with Email
                    </Button>
                </div>
                <div className={styles.switchMode}>Don't have an account?<span className={styles.switchModeLink}>Create one</span></div>
            </div>
        );
    }

    return (
        <div>
            {error && (<div className={`${styles.alert} ${styles.error}`}><ErrorIcon /><span>{error}</span></div>)}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email / Username <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                        <EnvelopeIcon className={styles.inputIcon} />
                        <input id="email" type="email" className={styles.input} placeholder="Enter your email address or username" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required disabled={loading} />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                        <LockIcon className={styles.inputIcon} />
                        <input id="password" type={showPassword ? 'text' : 'password'} className={styles.input} placeholder="Enter password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required disabled={loading} />
                        <Button
                            type="button"
                            variant="ghost"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </Button>
                    </div>
                </div>
                <div className={styles.forgotPassword}>
                    <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot Username or Password</a>
                </div>
                <div className={styles.buttonGroup}>
                    <Button
                        type="button"
                        variant="outline"
                        className={styles.backButton}
                        onClick={() => setShowEmailForm(false)}
                        disabled={loading}
                    >
                        <ArrowLeft />Back
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className={styles.submitButton}
                        disabled={loading}
                        isLoading={loading}
                    >
                        {!loading && 'Sign In'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
