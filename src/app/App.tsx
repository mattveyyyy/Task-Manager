import { Routes, Route } from 'react-router-dom';
import { TaskBoardPage } from '@pages/TaskBoardPage/TaskBoardPage';
import { EditTaskPage } from '@pages/EditTaskPage/EditTaskPage';
import { NewTaskPage } from '@pages/NewTaskPage/NewTaskPage';

function App() {
  return (
          <Routes>
            <Route path="/" element={<TaskBoardPage />} />
            <Route path="/task/new" element={<NewTaskPage/>} />      
            <Route path="/task/:id" element={<EditTaskPage/>} /> 
          </Routes>
  )
}
export default App
