import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './AddButton.module.css';

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button
        className={`${styles.fab} ${isHovered ? styles.fabHovered : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={onClick}
        >
        <div className={styles.iconWrapper}>
            <Plus
            size={24}
            className={`${styles.plusIcon} ${isHovered ? styles.plusIconHovered : ''} ${isPressed ? styles.plusIconPressed : ''}`}
            />
        </div>

        <div className={`${styles.tooltip} ${isHovered ? styles.tooltipVisible : ''}`}>
            Add new task
            <div className={styles.tooltipArrow} />
        </div>
        </button>
    );
};
