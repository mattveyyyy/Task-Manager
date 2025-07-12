
import { darkTheme } from './theme';
import { TaskItem } from './components/TaskItem/TaskItem'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AddButton } from './components/AddButton/AddButton';
function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <TaskItem 
      id='1'
      title='Test'
      description='Add filters for priority, status, and assignee to help users find tasks quickly.'
      category='Test'
      status='In Progress'
      priority='Medium'
      onEdit={(id) => console.log('Editing task:', id)}
    />
    <AddButton onClick={() => console.log('Add Task')} />
    </ThemeProvider>
  )
}

export default App
