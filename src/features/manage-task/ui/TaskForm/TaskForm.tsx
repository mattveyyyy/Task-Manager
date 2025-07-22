import { useState } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    Typography,
} from '@mui/material';
import styles from './TaskForm.module.css';
import type { Task, TaskFormProps } from '@entities/tasks/model/types';
import type { SelectChangeEvent } from '@mui/material';

export const TaskForm = ({ initialData, onSubmit, onCancel }: TaskFormProps) => {
    const [form, setForm] = useState<Task>(() => {
        return (
        initialData ?? {
            id: crypto.randomUUID(),
            title: '',
            description: '',
            category: 'Feature',
            status: 'To Do',
            priority: 'Medium',
            date: new Date().toISOString().slice(0, 16),
        }
        );
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSubmit(form);
    };

    return (
        <div className={styles.container}>
            <Typography variant="h5" component="h5">
                {initialData ? 'Edit Task' : 'Add New Task'}
            </Typography>

            <div className={styles.formGroup}>
                <label htmlFor="title">Title *</label>
                <TextField
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                fullWidth
                required
                variant="standard"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <TextField
                id="description"
                name="description"
                multiline
                rows={1}
                value={form.description}
                onChange={handleInputChange}
                fullWidth
                variant="standard"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Category *</label>
                <FormControl fullWidth variant="standard" required>
                <Select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleSelectChange}
                >
                    {['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status">Status *</label>
                <FormControl fullWidth variant="standard" required>
                <Select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleSelectChange}
                >
                    {['To Do', 'In Progress', 'Done'].map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="priority">Priority *</label>
                <FormControl fullWidth variant="standard" required>
                <Select
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleSelectChange}
                >
                    {['Low', 'Medium', 'High'].map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date">Created At</label>
                <TextField
                id="date"
                name="date"
                type="datetime-local"
                value={form.date}
                onChange={handleInputChange}
                fullWidth
                variant="standard"
                />
            </div>

            <div className={styles.buttonGroup}>
                <Button
                variant="contained"
                onClick={handleSave}
                style={{ backgroundColor: '#9c27b0' }}
                >
                Save
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                Cancel
                </Button>
            </div>
        </div>
    );
};
