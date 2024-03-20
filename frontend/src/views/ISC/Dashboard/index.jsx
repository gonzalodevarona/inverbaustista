import { useState, useEffect } from "react";
import { Typography, Box } from '@mui/material'
import CustomTable from '../../../components/CustomTables';
import InfoCard from '../InfoCard'
import Constants from '../../../utils/Constants'
import RaffleService from '../../../services/RaffleService';
import TicketService from '../../../services/TicketService';
import { parseDateToString } from "../../../utils/CommonFunctions";


function Dashboard() {

  const [raffles, setRaffles] = useState([]);

  const getRaffles = async () => {
    let raffles = await RaffleService.getActiveRaffles();

    let count = 0;

    for (const raffle of raffles) {
      count = await TicketService.countTicketsFiltered(raffle.id);
      raffle.availableTickets = count;
    }

    setRaffles(raffles);
  }

  useEffect(() => {
    getRaffles();
  }, []);


  const countAllAvailableTickets = () => {
    let count = 0;
    raffles.forEach((raffle) => { count += raffle.availableTickets });

    return count;
  }

  return (
    <Box>
      <Typography sx={{ mt: { xs: '3em', md: "1em" }, textAlign: { md: "start" } }} variant='h1'>Dashboard</Typography>
      <Box sx={[Constants.sxResponsiveFlex, { alignItems: { xs: 'center', md: 'start' }, gap: { xs: '1em', md: '2em' } }]}>
        
        <InfoCard title="Eventos vigentes" body={raffles.length} />
        <InfoCard title="Tickets disponibles" body={countAllAvailableTickets()} />
      </Box>

      <CustomTable sx={{ mt: '5em' }} title='Eventos vigentes' page='dashboard'
        columns={[
          { title: 'ID', field: 'id', type: 'numeric' },
          { title: 'Evento', field: 'name' },
          { title: 'Fecha en que juega', field: 'drawDate', type: 'datetime', render: rowData => parseDateToString(rowData.drawDate) },
          { title: 'Tickets disponibles', field: 'availableTickets', type: 'numeric' }
        ]} data={raffles} />
    </Box>
  )
}

export default Dashboard