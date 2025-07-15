import { Routes, Route, useNavigate } from 'react-router-dom';
// import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskBoard } from './components/TaskBoard/TaskBoard';
import { TaskProvider } from './context/TaskContext';
import { EditTaskPage } from './pages/EditTaskPage';
import { NewTaskPage } from './pages/NewTaskPage';
import { AddButton } from './components/AddButton/AddButton';
function App() {
    const navigate = useNavigate();

    const handleCreateTask = () => {
      navigate('/task/new');
    };
  return (
      <TaskProvider >
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/task/new" element={<NewTaskPage/>} />      
            <Route path="/task/:id" element={<EditTaskPage/>} /> 
          </Routes>
          <AddButton onClick={handleCreateTask} />
      </TaskProvider>
  )
}
export default App
