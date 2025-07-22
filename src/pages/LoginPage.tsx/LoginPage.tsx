import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from '@mui/material';
import styles from './LoginPage.module.css';

interface LoginForm {
    email: string;
    password: string;
}

interface LoginPageProps {
    onLogin: (data: LoginForm) => void;
    isAuthenticated?: boolean;
    error?: string;
    loading?: boolean;
}

export const LoginPage = ({ onLogin, isAuthenticated, error, loading }: LoginPageProps) => {
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    useEffect(() => {
    if (isAuthenticated) {
        navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(form);
    };

    return (
        <div className={styles.container}>
        <Typography variant="h5" component="h5">
            Login
        </Typography>

        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <TextField
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                fullWidth
                required
                variant="standard"
                autoComplete="username"
            />
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="password">Password *</label>
            <TextField
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
                fullWidth
                required
                variant="standard"
                autoComplete="current-password"
            />
            </div>

            {error && <Typography color="error" variant="body2" style={{ marginBottom: '16px' }}>{error}</Typography>}

            <div className={styles.buttonGroup}>
            <Button type="submit" variant="contained" disabled={loading} style={{ backgroundColor: '#9c27b0' }}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
            </div>
        </form>
        </div>
    );
};
