import { Routes, Route } from "react-router-dom"
import { TaskBoardPage } from "@pages/TaskBoardPage/TaskBoardPage"
import { EditTaskPage } from "@pages/EditTaskPage/EditTaskPage"
import { NewTaskPage } from "@pages/NewTaskPage/NewTaskPage"
import { Layout } from "./Layout"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TaskBoardPage />} />
        <Route path="/task/new" element={<NewTaskPage />} />
        <Route path="/task/:id" element={<EditTaskPage />} />
      </Route>
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  )
}

export default App
