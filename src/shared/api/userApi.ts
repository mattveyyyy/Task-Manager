export const BASE_URL = 'http://localhost:4000/api/v1/users';

export async function getUsers() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Ошибка при получении пользователей');
    return res.json();
}

export async function getUser(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Ошибка при получении пользователя с id=${id}`);
    return res.json();
}

export async function createUser(data: object) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Ошибка при создании пользователя');
    return res.json();
}

export async function updateUser(id: string, data: object) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении пользователя');
    return res.json();
}

export async function deleteUser(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Ошибка при удалении пользователя');
}
