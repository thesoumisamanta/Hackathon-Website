import React, {useEffect} from 'react'
import {TextField, Container} from '@mui/material'
import {useSelector, useDispatch} from "react-redux";
import { loadHackathons, setSearchQuery } from '../features/hackathons/hackathonsSlice';
import HackathonCard from '../components/HackathonCard';


export default function HomePage() {

    const dispatch = useDispatch();
    const {items, currentPage, hasMore, searchQuery, status} = useSelector((state) => state.hackathons);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(loadHackathons({page: currentPage, limit: 6, searchQuery}));
        }
    }, [status, dispatch, currentPage, searchQuery]);

    const handleSearchChange = e => {
        dispatch(setSearchQuery(e.target.value));
    }

    const loadMore = () => {
        dispatch(loadHackathons({page: currentPage + 1, limit: 6, searchQuery}));
    }

  return (
    <Container>
        <TextField fullWidth variant="outlined" placeholder="Search Hackathons" value={searchQuery} onChange={handleSearchChange} className="my-4"/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((hackathon, index) => (<HackathonCard key={hackathon._id || index} hackathon={hackathon} />))} 
        </div>
        {hasMore && <button onClick={loadMore} className="my-4 p-2 bg-blue-500 text-white rounded">Load More</button>}
    </Container>
  )
}
