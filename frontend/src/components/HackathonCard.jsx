import React from 'react'
import {Card, CardContent, CardMedia, Typography} from "@mui/material"

export default function HackathonCard({hackathon}) {

  return (
    <Card className="w-full max-w-md mx-auto my-4 flex" variant="outlined">
      <CardMedia component="img" image={hackathon.image} alt={hackathon.name} className="w-1/2" />

      <CardContent className="w-1/2">
        <Typography variant="h6">{hackathon.title}</Typography>
        <Typography variant="body2">{hackathon.description}</Typography>
        <Typography variant="subtitle2" className="font-bold">Prize: ${hackathon.prizeAmount}</Typography>
        <Typography variant="body2">{hackathon.location}</Typography>
        <Typography variant="caption">{new Date(hackathon.startDate).toLocaleDateString()} -{" "}
        {new Date(hackathon.endDate).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  )
}
