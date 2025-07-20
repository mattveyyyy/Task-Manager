import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
} from "@mui/material"
import {
    Home,
    CheckSquare,
    User,
    Settings,
    Menu,
    ChevronLeft
} from "lucide-react"
import clsx from "clsx"
import styles from "./Sidebar.module.css"

const navigationItems = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Tasks", url: "/", icon: CheckSquare },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
]

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()

    const isActive = (path: string) => {
        return path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path)
    }

    return (
        <Drawer
            variant="permanent"
            className={clsx(styles.drawer, {
                [styles.drawerCollapsed]: collapsed,
            })}
        classes={{
            paper: clsx(styles.drawerPaper, {
                [styles.drawerPaperCollapsed]: collapsed,
            }),
        }}
        >

        <div className={styles.logoSection}>
            {collapsed ? (
            <IconButton
                onClick={() => setCollapsed(false)}
                size="large"
                className={styles.menuToggleBtn}
            >
                <Menu size={28} color="#fff" />
            </IconButton>
    ) : (
        <>
        <div className={styles.logo}>
            <img
                src="/assets/images/favicon.png"
                alt="Logo"
                className={styles.logoImage}
            />
            <h1 className={styles.logoText}>
                Task<span className={styles.logoAccent}>Pilot</span>
            </h1>
        </div>
        <IconButton
            onClick={() => setCollapsed(true)}
            size="small"
            className={styles.closeBtn}
        >
            <ChevronLeft color="#aaa" size={28} />
        </IconButton>
        </>
    )}
    </div>

            <List className={styles.navList}>
                {navigationItems.map((item) => {
                    const active = isActive(item.url)
                    const Icon = item.icon

                    return (
                    <NavLink
                        key={item.title}
                        to={item.url}
                        end={item.url === "/"}
                        className={({ isActive }) =>
                        clsx(styles.navItem, {
                            [styles.navItemActive]: isActive,
                        })
                        }
                    >
                        <ListItemButton
                        className={styles.navItemButton}
                        disableRipple
                        disableTouchRipple
                        >
                        {collapsed ? (
                            <Tooltip title={item.title} placement="right">
                            <ListItemIcon className={styles.iconOnly}>
                                <Icon
                                className={styles.navIconCollapsed}
                                style={{
                                    color: active ? "#ffffff" : "#aaaaaa",
                                }}
                                />
                            </ListItemIcon>
                            </Tooltip>
                        ) : (
                            <>
                            <ListItemIcon>
                                <Icon
                                className={styles.navIcon}
                                style={{
                                    color: active ? "#ffffff" : "#aaaaaa",
                                }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                            </>
                        )}
                        </ListItemButton>
                    </NavLink>
                    )
            })}
            </List>
        </Drawer>
    )
}
