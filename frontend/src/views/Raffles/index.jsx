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

            {/* <Box sx={[CONSTANTS.sxResponsiveFlex, { gap: { xs: '5em', md: '8em' }, my: '6em' }]}> */}
            <Grid
                direction={{ xs: 'column', md: 'row' }}
                container
                sx={{m:0, p:0}}
                spacing={2}
                alignItems="center"
                wrap={{ xs: 'wrap', md: 'nowrap' }}
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                {loading ?
                    [1, 2, 3].map((item) => (
                        <Grid sx={{m:0, p:0}} key={item} item xs={12} m={4}>
                            <SkeletonCard />
                        </Grid>

                    )) : <></>}
                {(!loading) && raffles.length > 0 ?
                        raffles.map((raffle) => (
                            <Grid  sx={{m:0, p:0}} key={raffle.id} item xs={12} m={4}>
                                <RaffleCard raffle={raffle} />
                            </Grid>
                        ))
                        : <Typography
                            variant="subtitle-1"
                            sx={{ fontSize: '2rem' }}> No hay eventos vigentes
                        </Typography>
                }

            </Grid>
            {/* </Box> */}
        </Stack>
    )
}

export default Raffles