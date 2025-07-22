import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./Layout";

import { TaskBoardPage } from "@pages/TaskBoardPage/TaskBoardPage";
import { EditTaskPage } from "@pages/EditTaskPage/EditTaskPage";
import { NewTaskPage } from "@pages/NewTaskPage/NewTaskPage";
import { UserListPage } from "@/pages/UserListPage/UserListPage";
import { LoginPage } from "@/pages/LoginPage.tsx/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error("Ошибка авторизации");

      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      alert("Неверные данные");
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />

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
      </Route>
    </Routes>
  );
}

export default App;
