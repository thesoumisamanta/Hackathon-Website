import React from 'react'
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="text-white" component={Link} to="/" variant="h6">
                Hackathon
                </Typography>

                <div>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/dashboard" color="inherit">Developer Dashboard</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}
