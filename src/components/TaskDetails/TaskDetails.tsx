import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { useState } from 'react';
import styles from './TaskDetails.module.css';

import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export const TaskDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { tasks, updateTask } = useTaskContext();
    const navigate = useNavigate();

    const [form, setForm] = useState(() => {
        const found = tasks.find((t) => t.id === id);
        return found ? { ...found } : null;
    });

    if (!form) return <p>Task not found.</p>;

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev!, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev!, [name]: value }));
    };

    const handleSave = () => {
        updateTask(form);
        navigate('/');
    };

    return (
    <div className={styles.container}>
        <Typography variant="h5" gutterBottom>
        Edit Task
        </Typography>

        <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <TextField
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            fullWidth
            required
            size="small"
            variant="outlined"
            placeholder="Enter title"
            InputLabelProps={{ shrink: false }}
        />
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <TextField
            id="description"
            name="description"
            multiline
            rows={4}
            value={form.description || ''}
            onChange={handleInputChange}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter description (optional)"
            InputLabelProps={{ shrink: false }}
        />
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <FormControl fullWidth required size="small">
            <Select
            id="category"
            name="category"
            value={form.category}
            onChange={handleSelectChange}
            displayEmpty
            >
            <MenuItem value="" disabled>
                Select category
            </MenuItem>
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Feature">Feature</MenuItem>
            <MenuItem value="Documentation">Documentation</MenuItem>
            <MenuItem value="Refactor">Refactor</MenuItem>
            <MenuItem value="Test">Test</MenuItem>
            </Select>
        </FormControl>
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <FormControl fullWidth required size="small">
            <Select
            id="status"
            name="status"
            value={form.status}
            onChange={handleSelectChange}
            displayEmpty
            >
            <MenuItem value="" disabled>
                Select status
            </MenuItem>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            </Select>
        </FormControl>
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="priority">Priority</label>
        <FormControl fullWidth required size="small">
            <Select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleSelectChange}
            displayEmpty
            >
            <MenuItem value="" disabled>
                Select priority
            </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
            </Select>
        </FormControl>
        </div>

        <div className={styles.buttonGroup}>
        <Button
            variant="contained"
            style={{ backgroundColor: '#9c27b0' }}
            onClick={handleSave}
        >
            Сохранить
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
            Отмена
        </Button>
        </div>
    </div>
);
};
