import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/shared/api/auth';
import { CircularProgress, Typography } from '@mui/material';
import { EditUserPage } from '@/pages/EditUserPage/EditUserPage';

export const SettingsPage = () => {
  const { data: isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Ошибка загрузки профиля</Typography>;

  return <EditUserPage  />;

};