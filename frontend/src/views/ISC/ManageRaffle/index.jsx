import { useState, useEffect } from 'react'
import { Button, Stack, Box, Typography, } from "@mui/material";
import dayjs from "dayjs";
import CustomTable from '../../../components/CustomTables';
import { useNavigate } from 'react-router-dom';
import RaffleService from '../../../services/RaffleService';
import TicketService from '../../../services/TicketService';
import { translateRafflesStatus } from '../../../utils/CommonFunctions';
import { parseDateToString } from '../../../utils/CommonFunctions';


function ManageRaffle() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/isc/' + route)
    };

    

    const [raffles, setRaffles] = useState([]);

    const getRaffles = async () => {
        let raffles = await RaffleService.getAllRaffles();

        let count = 0;

        for (const raffle of raffles) {
            count = await TicketService.countTicketsFiltered(raffle.id);
            raffle.availableTickets = count;
        }

        setRaffles(translateRafflesStatus(raffles));
    }

    useEffect(() => {
        getRaffles();
    }, []);



   

    return (
        <Stack spacing={5}>
            <Typography variant='h1'>Administrar eventos</Typography>
            <Box>
                <CustomTable sx={{ mt: '5em' }} title='Todos los eventos' page='raffles'
                    columns={[
                        { title: 'ID', field: 'id', type: 'numeric' },
                        { title: 'Nombre', field: 'name' },
                        { title: 'Estado', field: 'status' },
                        { title: 'Fecha en que juega', field: 'drawDate', type: 'datetime', render: rowData => parseDateToString(rowData.drawDate) },
                        { title: 'Con que juega', field: 'drawEvent' },
                        { title: 'Precio por ticket', field: 'pricePerTicket', type: 'currency' },
                        { title: 'Descuento', field: 'discount', type: 'numeric', render: rowData => rowData.discount + '%' },
                        { title: 'Tickets disponibles', field: 'availableTickets', type: 'numeric' }
                    ]} data={raffles} />
            </Box>
            <Button sx={{ maxWidth: '40%' }} fullWidth variant='contained' onClick={() => handleRedirectClick('raffle/create')}>
                + Crear nuevo evento
            </Button>

        </Stack>
    )
}

export default ManageRaffle