import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./Layout";

import { TaskBoardPage } from "@pages/TaskBoardPage/TaskBoardPage";
import { EditTaskPage } from "@pages/EditTaskPage/EditTaskPage";
import { NewTaskPage } from "@pages/NewTaskPage/NewTaskPage";
import { UserListPage } from "@/pages/UserListPage/UserListPage";
import { LoginPage } from "@/pages/LoginPage.tsx/LoginPage";
import {SettingsPage} from "@/pages/SettingsPage/SettingsPage"
import { PrivateRoute } from "./PrivateRoute";
import { CreateUserPage } from "@/pages/CreateUserPage/CreateUserPage";
import { EditUserPage } from "@/pages/EditUserPage/EditUserPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, login } from "@/entities/auth/authSlice";
import { type RootState, type AppDispatch } from "@/app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    await dispatch(login(credentials));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} isAuthenticated={isAuthenticated} error={error ?? undefined} />}
      />

      <Route element={<Layout />}>
        <Route path="/" element={<PrivateRoute><UserListPage /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><TaskBoardPage /></PrivateRoute>} />
        <Route path="/task/new" element={<PrivateRoute><NewTaskPage /></PrivateRoute>} />
        <Route path="/task/:id" element={<PrivateRoute><EditTaskPage /></PrivateRoute>} />
        <Route path="/user/create" element={<PrivateRoute><CreateUserPage /></PrivateRoute>} />
        <Route path="/user/edit/:id" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>}/>
      </Route>
    </Routes>
  );
}

export default App;
