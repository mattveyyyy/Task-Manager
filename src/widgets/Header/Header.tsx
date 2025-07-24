import { Button, IconButton, Tooltip } from "@mui/material";
import { Bell, Moon, LogOut } from "lucide-react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "@/entities/auth/authSlice";     
import { store } from "@/app/store";              

export function Header() {
    const navigate = useNavigate();

    const handleCreateTask = () => {
        navigate("/task/new");
    };

    const handleCreateUser = () => {
        navigate("/user/create");
    };

    const handleLogout = async () => {
        try {
            await store.dispatch(logout());   
            navigate("/login");              
        } catch (error) {
            console.error(error);
            alert("Не удалось выйти из системы");
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.center}>
                <h2 className={styles.pageTitle}></h2>
            </div>
            <div className={styles.right}>
                <Button
                    variant="contained"
                    className={styles.newTaskBtn}
                    onClick={handleCreateUser}
                >
                    + Create user
                </Button>
                <Button
                    variant="contained"
                    className={styles.newTaskBtn}
                    onClick={handleCreateTask}
                >
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

                <Tooltip title="Logout">
                    <IconButton className={styles.iconBtn} onClick={handleLogout}>
                        <LogOut size={22} />
                    </IconButton>
                </Tooltip>
            </div>
        </header>
    );
}
