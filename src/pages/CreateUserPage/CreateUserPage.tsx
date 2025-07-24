// CreateUserPage.tsx
import { useNavigate } from 'react-router-dom';
import { createUser } from '@shared/api/user';
import { UserForm } from '@features/manage-user/ui/UserForm/UserForm';

export const CreateUserPage = () => {
  const navigate = useNavigate();

  return (
    <UserForm
      onSubmit={async (userData) => {
        await createUser(userData);
        navigate('/');
      }}
      onCancel={() => navigate('/')}
    />
  );
};
