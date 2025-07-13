
import { darkTheme } from './theme';
import { TaskItem } from './components/TaskItem/TaskItem'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AddButton } from './components/AddButton/AddButton';
// import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import { TaskBoard } from './components/TaskBoard/TaskBoard';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} /> */}
        <main>
          <TaskBoard />
    <AddButton onClick={() => console.log('Add Task')} />
        </main>
    </ThemeProvider>
  )
}

export default App
