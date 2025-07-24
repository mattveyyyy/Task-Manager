import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '@shared/api/user';
import { UserForm } from '@features/manage-user/ui/UserForm/UserForm';

export const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getUser(id)
      .then((data) => {
        setInitialData({
          ...data,
          birthDate: data.birthDate ? new Date(data.birthDate) : null,
          password: '', 
          userAgreement: true, 
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке пользователя');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values: any) => {
    if (!id) return;
    try {
      const prepared = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.toISOString() : null,
      };
      await updateUser(id, prepared);
      navigate('/');
    } catch (err: any) {
      alert('Ошибка при обновлении пользователя: ' + err.message);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!initialData) return <p>Пользователь не найден</p>;

  return (
    <UserForm
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/')}
    />
  );
};
