import { Box, Typography } from "@mui/material";
import ProjectTable from "./components/ProjectTable";

export type Project = {
    project_id: number,
    name: string,
    start_date: string,
    created: string,
    updated: string
}

export type Task = {
    task_id: number,
    name: string,
    est_size: number,
    created: string,
    updated: string
}

const Home = () => {
    return (  
        <Box>
            <Typography variant="h3" sx={{marginBottom: 3}}>
                Project Management System
            </Typography>
            <ProjectTable />
        </Box>
    );
}
 
export default Home;