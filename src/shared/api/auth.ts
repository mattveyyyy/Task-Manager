const AUTH_BASE_URL = '/api/v1/auth';

type LoginData = {
    email: string;
    password: string;
};

export async function login(data: LoginData) {
    const res = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка входа');
    }

    return res.json(); 
}

export async function logout() {
    const res = await fetch(`${AUTH_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Ошибка выхода');
    }
}

export async function getCurrentUser() {
    const res = await fetch(`${AUTH_BASE_URL}/me`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Не удалось получить текущего пользователя');
    }

    return res.json(); 
}
