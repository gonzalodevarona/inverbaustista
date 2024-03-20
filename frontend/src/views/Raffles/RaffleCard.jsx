import {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleNavigate } from '../../utils/CommonFunctions';
import TicketsDefault from '../../assets/images/tickets.png';

export default function RaffleCard({ raffle }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`/raffle/${raffle.id}`);
    };

    return (
        raffle && <Card sx={{ minWidth: '35em', maxWidth: '45em', maxHeight:"70em"}}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    sx={{ minWidth: '35em', maxWidth: '45em', maxHeight:"40em"}}
                    src={raffle.images.length>0? raffle.images[0].url : TicketsDefault}
                    alt="Imagen promocional evento"
                />
                <CardContent sx={{ textAlign: 'start' }}>
                    <Stack spacing="1em">
                        <Typography variant="h2" sx={{ fontSize: '2.4rem' }} >
                            {raffle.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                            Tickets desde ${new Intl.NumberFormat('es-CO').format(raffle.pricePerTicket)}
                        </Typography>
                        <Button sx={{ width: '100%' }} variant="contained">
                            Compra ya
                        </Button>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}