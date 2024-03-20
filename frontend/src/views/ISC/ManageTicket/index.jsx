import { useState, useEffect } from 'react'
import { Button, Stack, Box, Typography, } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import CustomTable from '../../../components/CustomTables';
import RaffleService from '../../../services/RaffleService';
import TicketService from '../../../services/TicketService';
import { translateRafflesStatus } from '../../../utils/CommonFunctions';
import { parseDateToString } from '../../../utils/CommonFunctions';

function ManageTickets() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/isc/' + route)
    };



    const [raffles, setRaffles] = useState([]);

    const getSellableRaffles = async () => {
        let raffles = await RaffleService.getSellableRaffles();

        let allCount = 0;
        let soldCount = 0;
        let availableCount = 0;

        for (const raffle of raffles) {
            allCount = await TicketService.countAllTickets(raffle.id);
            soldCount = await TicketService.countTicketsFiltered(raffle.id, 'SOLD');
            availableCount = await TicketService.countTicketsFiltered(raffle.id, 'AVAILABLE');

            raffle.allTickets = allCount;
            raffle.soldTickets = soldCount;
            raffle.availableTickets = availableCount;
        }

        setRaffles(translateRafflesStatus(raffles));
    }

    useEffect(() => {
        getSellableRaffles();
    }, []);


    return (
        <Stack useFlexGap>
            <Typography variant='h1'>Administrar tickets</Typography>

            <CustomTable sx={{ mt: '5em' }} title='Eventos' page='tickets'
                columns={[
                    { title: 'ID', field: 'id', type: 'numeric' },
                    { title: 'Nombre', field: 'name' },
                    { title: 'Estado', field: 'status' },
                    { title: 'Fecha en que juega', field: 'drawDate', type: 'datetime', render: rowData => parseDateToString(rowData.drawDate) },
                    { title: 'Precio por ticket', field: 'pricePerTicket', type: 'currency' },
                    { title: 'Descuento', field: 'discount', type: 'numeric', render: rowData => rowData.discount + '%' },
                    { title: 'Tickets vendidos', field: 'soldTickets', type: 'numeric' },
                    { title: 'Tickets disponibles', field: 'availableTickets', type: 'numeric' },
                    { title: 'Tickets totales', field: 'allTickets', type: 'numeric' },
                ]} data={raffles}  parentAction={getSellableRaffles}/>

            <Button sx={{ maxWidth: '40%' }} fullWidth variant='contained' color='primary' onClick={() => handleRedirectClick('ticket/edit')}>
                📝 Modificar tickets
            </Button>
        </Stack>
    )
}

export default ManageTickets