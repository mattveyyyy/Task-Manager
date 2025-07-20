import { Button, IconButton, Tooltip } from "@mui/material"
import { Bell, Moon } from "lucide-react"
import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const handleCreateTask = () => {
        navigate('/task/new');
    };
    return (
        <header className={styles.header}>
        <div className={styles.center}>
            <h2 className={styles.pageTitle}>Dashboard</h2>
        </div>
        <div className={styles.right}>
            <Button variant="contained" className={styles.newTaskBtn} onClick={handleCreateTask}>
                + New Task
            </Button>

            <Tooltip title="Toggle theme">
                <IconButton className={styles.iconBtn}>
                    <Moon size={22} />
                </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
                <IconButton className={styles.iconBtn}>
                    <Bell size={22} />
                </IconButton>
            </Tooltip>
        </div>
        </header>
    )
}
