import React from 'react'
import { useEffect, useState } from 'react';
import RaffleCard from './RaffleCard'
import axios from '../../config/AxiosBackend';
import { Skeleton, Stack, Typography, Grid } from '@mui/material/';
import SkeletonCard from '../../components/SkeletonCard';
import { removeLocalData, setLocalData } from '../../utils/CommonFunctions'
import CONSTANTS from '../../utils/Constants';
import RaffleService from '../../services/RaffleService';

function Raffles() {


    const [raffles, setRaffles] = useState([]);
    const [loading, setLoading] = useState(true);


    const getRaffles = async () => {
        setRaffles(await RaffleService.getActiveRafflesWithAvailableTickets());
    }

    useEffect(() => {
        getRaffles();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        removeLocalData(CONSTANTS.paymentDataKey);
        removeLocalData(CONSTANTS.tokenKey);

    }, []);


    return (
        <Stack sx={CONSTANTS.styleStackContainer} >
            <Typography variant="h1">Eventos vigentes</Typography>

            <Grid
                direction={{ xs: 'column', sm: 'row' }}
                container
                spacing={{ xs: 0, sm: 5 }} 
                alignItems="center"
                justify="center"
            >

                {loading ?
                    [1, 2, 3].map(item => (
                        <Grid key={item} item xs={12} sm={6} md={3}>
                            <SkeletonCard />
                        </Grid>
                    ))
                    : raffles.length === 0 ?
                        <Typography variant="subtitle-1" sx={{ fontSize: '2rem' }}> No hay eventos vigentes </Typography>
                        : raffles.map(raffle => (
                            <Grid  key={raffle.id} item xs={12} md={4}>
                                <RaffleCard raffle={raffle} />
                            </Grid>
                        ))
                }


            </Grid>
        </Stack>
    )
}

export default Raffles