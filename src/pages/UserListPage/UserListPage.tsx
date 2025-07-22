import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@shared/api/userApi';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

export const UserListPage = () => {
    const { data: users, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Не удалось загрузить пользователей</Typography>;

    return (
        <>
        <Typography variant="h4" gutterBottom>Пользователи</Typography>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Имя</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user: any) => (
                <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </>
    );
};
