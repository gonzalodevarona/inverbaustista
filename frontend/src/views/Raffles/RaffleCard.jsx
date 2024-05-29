import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { parseDateToString } from '../../utils/CommonFunctions';
import TicketsDefault from '../../assets/images/tickets.png';

export default function RaffleCard({ raffle }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`/raffle/${raffle.id}`);
    };

    const limitNameCharacters = (name) => {
        if (name.length > 48) {
            return name.substring(0, 48) + '...';
        }
        return name;
    }

    return (
        raffle.name && <Card sx={{ width: '35em', height: "59em" }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    sx={{ width: '35em', height: "35em" }}
                    src={raffle.images.length > 0 ? raffle.images[0].url : TicketsDefault}
                    alt="Imagen promocional evento"
                />
                <CardContent sx={{ textAlign: 'start' }}>
                    <Stack spacing="1em">
                        <Typography variant="h2" sx={{ fontSize: '2.4rem' }} >
                            {limitNameCharacters(raffle.name)}
                        </Typography>
                        <Stack spacing={0}>
                            <Typography sx={{ m: 0 }} variant="subtitle1" color="text.primary">
                                Tickets desde ${new Intl.NumberFormat('es-CO').format(raffle.pricePerTicket)}
                            </Typography>
                            <Typography variant="p" sx={{ fontSize: 14, m: 0 }} color="text.primary">
                                Juega el: {parseDateToString(raffle.drawDate, false)}
                            </Typography>
                        </Stack>
                        <Button sx={{ width: '100%' }} variant="contained">
                            Compra ya
                        </Button>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}