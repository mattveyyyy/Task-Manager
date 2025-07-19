import { Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../src/store/store.ts'
import { TaskBoard } from './components/TaskBoard/TaskBoard';
import { EditTaskPage } from './pages/EditTaskPage';
import { NewTaskPage } from './pages/NewTaskPage';
import { AddButton } from './components/AddButton/AddButton';
function App() {
    const navigate = useNavigate();

    const handleCreateTask = () => {
      navigate('/task/new');
    };
  return (
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/task/new" element={<NewTaskPage/>} />      
            <Route path="/task/:id" element={<EditTaskPage/>} /> 
          </Routes>
          <AddButton onClick={handleCreateTask} />
        </Provider>
  )
}
export default App
