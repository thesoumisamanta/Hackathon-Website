import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

export default function HackathonCard({ hackathon }) {
  console.log(hackathon);

  return (
    <Card className="flex flex-row m-3" variant="outlined" style={{ width: '100%', maxWidth: '38rem' }}>
      
      {/* Image Section (Left side 40%) */}
      <div className="flex-shrink-0" style={{ width: '40%', padding: '1rem' }}>
        <CardMedia 
          component="img" 
          image={hackathon.image} 
          alt={hackathon.title} 
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '8px',
          }} 
        />
      </div>

      {/* Content Section (Right side 60%) */}
      <div className="flex-grow-1 p-4" style={{ width: '60%' }}>
        <CardContent>
          <Typography variant="h6" className="font-bold">{hackathon.title}</Typography>
          <Typography variant="subtitle2" className="text-muted mb-2">
            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" className="mb-2">
            {hackathon.description}
          </Typography>
          <Typography variant="body2" className="mb-2">
            <strong>Place:</strong> {hackathon.place}
          </Typography>
          <Typography variant="body2" className="mb-2">
            <strong>Prize: </strong>{hackathon.prizeAmount}
          </Typography>
          {/* <Button 
            variant="contained" 
            color="primary" 
            className="me-2 rounded-xl" 
            onClick={() => console.log("View details clicked for", hackathon)}
          >
            View Details
          </Button> */}
        </CardContent>
      </div>
      
    </Card>
  );
}
