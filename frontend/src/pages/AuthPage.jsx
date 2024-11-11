// src/pages/AuthPage.js
import React, { useState } from 'react';
import { Card, Button, TextField, Typography, Box, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login, register } from '../features/auth/authSlice'; // Import both login and register actions
import '../../src/App.css'; // Add custom styles for flipping

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: credentials.email, password: credentials.password }));
    } else {
      dispatch(register(credentials)); // Assuming confirmPassword check happens in the backend
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCredentials({ email: '', password: '', confirmPassword: '' }); // Reset form on toggle
  };

  return (
    <Box className="auth-container">
      <Card className={`auth-card ${isLogin ? 'login' : 'register'}`}>
        <Box className="auth-content">
          <Typography variant="h4" align="center" gutterBottom>
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              required
              value={credentials.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={credentials.password}
              onChange={handleChange}
              margin="normal"
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                required
                value={credentials.confirmPassword}
                onChange={handleChange}
                margin="normal"
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          {isLogin && (
            <Box mt={2} textAlign="center">
              <Link href="#" color="secondary" underline="hover">
                Forgot Password?
              </Link>
            </Box>
          )}
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Link href="#" onClick={toggleForm} color="secondary" underline="hover">
                {isLogin ? 'Register' : 'Login'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
