import { TaskForm } from "./TaskForm";

export default {
    title: 'Forms/TaskForm',
    component: TaskForm,
};

export const Default = () => <TaskForm onSubmit={() => console.log('submit')} onCancel={() => console.log('cancel')}/>;
