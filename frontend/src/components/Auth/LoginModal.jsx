import React, { useState } from 'react'
import {Modal, Button, TextField} from '@mui/material'
import {useDispatch} from 'react-redux'
import {login} from '../../features/auth/authSlice'

export default function LoginModal({open, handleClose}) {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setCredentials({...credentials, [name]: value})
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(credentials))
        handleClose()
    }

  return (
    <Modal open={open} onClose={handleClose}>
        <form className="p-4" onSubmit={handleSubmit}>
        <TextField name="email" label="Email" onChange={handleChange} fullWidth required />
                <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth required />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </form>
    </Modal>
  )
}
