
import { darkTheme } from './theme';
import { TaskItem } from './components/TaskItem/TaskItem'
import { ThemeProvider } from '@emotion/react';

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
    <TaskItem 
      id='1'
      title='Test'
      description='Add filters for priority, status, and assignee to help users find tasks quickly.'
      category='Test'
      status='In Progress'
      priority='Medium'
      onEdit={(id) => console.log('Editing task:', id)}
    />
    </ThemeProvider>
  )
}

export default App
