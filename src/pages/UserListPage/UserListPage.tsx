import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/shared/api/user';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UserListPage = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Не удалось загрузить пользователей</Typography>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Пользователи
      </Typography>
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
            <TableRow
              key={user.id}
              hover
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/user/edit/${user.id}`)}
            >
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
