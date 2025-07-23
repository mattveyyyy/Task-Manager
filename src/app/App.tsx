import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./Layout";

import { TaskBoardPage } from "@pages/TaskBoardPage/TaskBoardPage";
import { EditTaskPage } from "@pages/EditTaskPage/EditTaskPage";
import { NewTaskPage } from "@pages/NewTaskPage/NewTaskPage";
import { UserListPage } from "@/pages/UserListPage/UserListPage";
import { LoginPage } from "@/pages/LoginPage.tsx/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { CreateUserForm } from "@/features/manage-user/ui/CreateUserForm/CreateUserForm";
import { login, getCurrentUser } from "@/shared/api/auth";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 

  useEffect(() => {
    async function checkAuth() {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      alert("Неверные данные");
    }
  };

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
      />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TaskBoardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/new"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <NewTaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EditTaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreateUserForm />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
