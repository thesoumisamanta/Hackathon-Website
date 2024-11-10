import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { fetchHackathonDetails } from '../api/hackathons';
import {Container, Typography, Card, CardMedia, CardContent} from '@mui/material';

export default function HackathonDetails() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const hackathon = useSelector((state) => state.hackathons.selectedHackathon);

    useEffect(() => {
        dispatch(fetchHackathonDetails(id));
    }, [dispatch, id]); 

    if (!hackathon) return <p>Loading...</p>;
    
  return (
    <Container>
        <CardMedia component="img" image={hackathon.image} alt={hackathon.name}  />

        <CardContent>
            <Typography variant="h6">{hackathon.title}</Typography>
            <Typography variant="body2">{hackathon.description}</Typography>
            <Typography variant="subtitle2" className="font-bold">Prize: ${hackathon.prizeAmount}</Typography>
            <Typography variant="body2">{hackathon.location}</Typography>
            <Typography variant="caption">{new Date(hackathon.startDate).toLocaleDateString()} -{" "}{new Date(hackathon.endDate).toLocaleDateString()}</Typography>
        </CardContent>
    </Container>
  )
}
