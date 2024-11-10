import React, { useState } from 'react'
import { Modal, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { register } from '../../features/auth/authSlice'


export default function SignupModal({ open, handleClose }) {

    const [userInfo, setUserInfo] = useState({
        username="",
        email="",
        password=""
    })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(userInfo))
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} className="p-4">
            <TextField name="username" label="Username" onChange={handleChange} fullWidth required />
            <TextField name="email" label="Email" onChange={handleChange} fullWidth required />
            <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth required />
            <Button type="submit" variant="contained" color="primary">Signup</Button>
        </form>
    </Modal>
    )
}
