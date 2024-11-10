import React from 'react'
import { Card, CardContent, CardMedia, Typography } from "@mui/material"

export default function HackathonCard({ hackathon }) {
  console.log(hackathon);

  return (
    <Card className="w-full max-w-md mx-auto my-4 flex" variant="outlined" style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
      {/* Image */}
      <CardMedia 
        component="img" 
        image={hackathon.image} 
        alt={hackathon.title} 
        className="flex-shrink-0" 
        style={{ objectFit: 'cover', width: '50%', height: '100%' }} 
      />

      {/* Content */}
      <CardContent 
        className="w-1/2" 
        style={{
          border: '1px solid red', 
          padding: '16px',
          flex: '1 1 50%',  // Allow it to grow/shrink based on available space
          overflow: 'hidden', // Prevent overflow
          whiteSpace: 'normal', // Allow wrapping of content if necessary
        }}
      >
        <Typography variant="h6">{hackathon.title}</Typography>
        <Typography variant="body2">{hackathon.description}</Typography>
        <Typography variant="subtitle2" className="font-bold">Prize: ${hackathon.prizeAmount}</Typography>
        <Typography variant="body2">{hackathon.place}</Typography>
        <Typography variant="caption">{new Date(hackathon.startDate).toLocaleDateString()} -{" "}
          {new Date(hackathon.endDate).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  )
}
