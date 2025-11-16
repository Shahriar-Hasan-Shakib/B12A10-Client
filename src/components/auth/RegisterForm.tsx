import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@src/hooks';
import { GoogleIcon, EnvelopeIcon, LockIcon, EyeIcon, EyeSlashIcon, UserIcon, ErrorIcon, ArrowLeft } from '@src/assets/icons';
import { Button } from '@src/components/ui';
import styles from './style.module.css';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const { signUp, signInWithGoogle } = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '', name: '', newsletter: false });

    const handleGoogleRegister = async () => {
        try {
            setLoading(true);
            setError('');
            await signInWithGoogle();
            navigate('/');
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || 'Failed to register with Google');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password.length < 7) {
            setError('Password must be at least 7 characters');
            return;
        }
        try {
            setLoading(true);
            setError('');
            await signUp({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                photoURL: '',
            });
            navigate('/');
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || 'Failed to register');
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
                        onClick={handleGoogleRegister}
                        disabled={loading}
                    >
                        <GoogleIcon />Register with Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={styles.socialButton}
                        onClick={() => setShowEmailForm(true)}
                    >
                        <EnvelopeIcon />Register with Email
                    </Button>
                </div>
                <div className={styles.switchMode}>Have an account?<span className={styles.switchModeLink}>Sign in</span></div>
                <div className={styles.disclaimer}>When you link your Google account, ProHero collects certain information stored in that account that you have configured to make available. By linking your accounts, you authorize ProHero to access and use your account on the third party service in connection with your use of ProHero.</div>
            </div>
        );
    }

    return (
        <div>
            {error && (<div className={`${styles.alert} ${styles.error}`}><ErrorIcon /><span>{error}</span></div>)}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                        <EnvelopeIcon className={styles.inputIcon} />
                        <input id="email" type="email" className={styles.input} placeholder="Enter your email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required disabled={loading} />
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
                    <span className={styles.helperText}>Minimum of 7 characters</span>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                        <UserIcon className={styles.inputIcon} />
                        <input id="name" type="text" className={styles.input} placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={loading} />
                    </div>
                    <span className={styles.helperText}>Will be displayed on your profile</span>
                </div>
                <div className={styles.checkboxGroup}>
                    <input id="newsletter" type="checkbox" className={styles.checkbox} checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} />
                    <label htmlFor="newsletter" className={styles.checkboxLabel}>Email me ProHero news and tips<br />You can opt out at any time</label>
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
                        {!loading && 'Next'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
