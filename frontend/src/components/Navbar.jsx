import React from 'react';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setSignupOpen }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Toolbar className="flex justify-between">
        <Typography component="h6" sx={{ color: 'black' }}>
          Hackathon
        </Typography>
        <div className="flex">
          <Button 
            color="primary" 
            sx={{ marginRight: 2 }} 
            onClick={handleLoginClick} // Navigate to login page
          >
            Login
          </Button>
          <Button 
            color="primary" 
            onClick={() => setSignupOpen(true)} // Trigger Signup modal if needed
          >
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
