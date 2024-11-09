import React, {useState} from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import {useDispatch} from 'react-redux'
import { createHackathon } from '../features/hackathons/hackathonsSlice'

const Dashboard = () => {
    const [hackathonData, setHackathonData] = useState({
        title: "",
        description: "",
        prizeAmount: "",
        startDate: "",
        endDate: "",
        place: "",
        maxParticipants: null
    })

    const dispatch = 
}

export default function Dashboard() {
  return (
    <Container>
        <Typography>Create new Hackathon</Typography>
        <form>
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <TextField label="" name="" onChange={} fullWidth multiline margin="normal" required />
            <Button>Create</Button>
        </form>
    </Container>
  )
}
