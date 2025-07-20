import { Routes, Route } from 'react-router-dom';
import { TaskBoardPage } from '@pages/TaskBoardPage/TaskBoardPage';
import { EditTaskPage } from '@pages/EditTaskPage/EditTaskPage';
import { NewTaskPage } from '@pages/NewTaskPage/NewTaskPage';
import { Box } from '@mui/material';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';

function App() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<TaskBoardPage />} />
          <Route path="/task/new" element={<NewTaskPage />} />
          <Route path="/task/:id" element={<EditTaskPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
export default App
