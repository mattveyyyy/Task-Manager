import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    IconButton,
    Box,
} from '@mui/material';
import { Edit, ArrowUp, ArrowDown, CheckCircle2, Activity } from 'lucide-react';
import styles from './TaskItem.module.css';

interface TaskItemProps {
    id: string;
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    onEdit(id: string): void;
}

export const TaskItem = ({
    id,
    title,
    description,
    category,
    status,
    priority,
    onEdit
}: TaskItemProps) => {
    const getCategoryColor = () => {
        switch (category) {
            case 'Bug': return 'error';
            case 'Feature': return 'primary';
            case 'Documentation': return 'info';
            case 'Refactor': return 'warning';
            case 'Test': return 'success';
            default: return 'default';
        }
    };

    const getPriorityIcon = () => {
        switch (priority) {
            case 'High': return <ArrowUp size={16} />;
            case 'Medium': return <Activity size={16} />;
            case 'Low': return <ArrowDown size={16} />;
            default: return <span className={styles.priorityMediumDot} />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'Done': return 'success';
            case 'In Progress': return 'info';
            default: return 'default';
        }
    };

    return (
        <Card className={styles.card} variant="outlined">
            <CardContent className={styles.cardContent}>
                <div className={styles.editIconWrapper}>
                    <IconButton 
                        aria-label="edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(id);
                        }}
                        className={styles.editButton}
                    >
                        <Edit className={styles.editIcon} />
                    </IconButton>
                </div>
                <Box className={styles.contentWrapper}>
                    <Box className={styles.textContent}>
                        <Typography 
                            variant="h6" 
                            className={`${styles.title} ${status === 'Done' ? styles.completed : ''}`}
                        >
                            {title}
                        </Typography>
                        
                        {description && (
                            <Typography variant="body2" className={styles.description}>
                                {description}
                            </Typography>
                        )}
                    </Box>


                    <Stack direction="row" spacing={1} className={styles.tags}>
                        <Chip 
                            label={category} 
                            color={getCategoryColor()}
                            size="small"
                            className={styles.chip}
                        />
                        <Chip
                            label={status}
                            color={getStatusColor()}
                            size="small"
                            icon={status === 'Done' ? <CheckCircle2 size={14} /> : undefined}
                            className={styles.chip}
                        />
                        <Chip
                            label={priority}
                            variant="outlined"
                            size="small"
                            icon={getPriorityIcon()}
                            className={`${styles[`priority-${priority.toLowerCase()}`]} ${styles.priorityChip} ${styles.chip} `}
                        />
                    </Stack>
                </Box>
                
            </CardContent>
        </Card>
    );
};