import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createHackathon } from '../features/hackathons/hackathonsSlice'





export default function Dashboard() {

  const [hackathonData, setHackathonData] = useState({
    title: "",
    description: "",
    prizeAmount: "",
    startDate: "",
    endDate: "",
    place: "",
    maxParticipants: null
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setHackathonData({ ...hackathonData, [name]: value })
  }

  handleFileChange = (e) => {
    setHackathonData({ ...hackathonData, image: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    for(let key in hackathonData) {
      formData.append(key, hackathonData[key])
    }

    dispatch(createHackathon(formData))
  }

  return (
    <Container className="my-8">
    <Typography variant="h4">Create New Hackathon</Typography>
    <form onSubmit={handleSubmit} className="my-4">
        <TextField label="Title" name="title" onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Description" name="description" onChange={handleChange} fullWidth multiline rows={4} margin="normal" required />
        <TextField label="Prize Amount" name="prizeAmount" type="number" onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Start Date" name="startDate" type="date" onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="End Date" name="endDate" type="date" onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Place" name="place" onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Max Participants" name="maxParticipants" type="number" onChange={handleChange} fullWidth margin="normal" />
        <input type="file" onChange={handleFileChange} accept="image/*" className="my-4" />
        <Button type="submit" variant="contained" color="primary">Create Hackathon</Button>
    </form>
</Container>
  )
}
