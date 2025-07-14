import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Sidebar } from './components/Sidebar/Sidebar';
import { TaskBoard } from './components/TaskBoard/TaskBoard';
import { TaskProvider } from './context/TaskContext';
import { TaskDetails } from './components/TaskDetails/TaskDetails';

function App() {
  return (
      <TaskProvider >
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
  )
}

export default App
