import { Outlet } from "react-router-dom"
import { Sidebar } from "@/widgets/Sidebar/Sidebar"
import { Header } from "@/widgets/Header/Header"
import { Box } from "@mui/material"

export function Layout() {
    return (
        <Box display="flex">
        <Sidebar />
        <Box flexGrow={1}>
            <Header />
            <Box mt="84px" p={3}>
            <Outlet />
            </Box>
        </Box>
        </Box>
    )
}
