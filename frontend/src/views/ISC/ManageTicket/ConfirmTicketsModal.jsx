import { Typography, Dialog, Stack, Box, Button, DialogContent, DialogTitle } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../../../components/Alerts/ToastAlert'
import TicketService from '../../../services/TicketService';

function ConfirmTicketsModal({ open, handleClose, ticketsData }) {

    const navigate = useNavigate();

    const handleSucesss = async () => {
        handleClose();
        
        if(ticketsData.operation === 'add') {
            TicketService.addTickets(ticketsData.raffle, ticketsData.tickets)
        } else if(ticketsData.operation === 'delete'){
            TicketService.deleteTickets(ticketsData.raffle, ticketsData.tickets)
        }
        

        ToastAlert('top-right', 4000).fire({
            icon: 'success',
            title: `Modificación exitosa: los números de los tickets fueron ${ticketsData.operation === 'add' ? 'agregados' : 'eliminados'}`
        })
        navigate('/isc/dashboard')
    };


    const styleContentModal = {
        border: '2px solid frame',
        boxShadow: 10,
    };


    const styleButtons = {
        minWidth: { xs: '10em', md: '20em' }
    };


    return (
        <Dialog
            open={open}
            fullwidth
            scroll='paper'
            maxWidth='lg'
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={styleContentModal}
            PaperProps={{ sx: { borderRadius: "1.5em" } }}
        >

            <Stack spacing={3} sx={{ p: { md: '4em' }, py: { xs: '2em' } }}>
                <DialogTitle sx={{ fontSize: '2.2rem', }} variant='h2'>
                    Por favor confirma la siguiente modificación
                </DialogTitle>
                <DialogContent>

                    <Stack spacing={1}>
                        <Typography variant='subtitle1'>
                            Nombre del evento: <Typography display={'inline'}>{ticketsData.raffle}</Typography>
                        </Typography>


                        <Typography variant='subtitle1'>
                            Operación: {ticketsData.operation === 'add' ? 'Agregar' : 'Eliminar'} tickets
                        </Typography>

                        <Typography variant="subtitle1" >
                            Números:
                            <Typography display={'inline'} > {ticketsData.tickets}  </Typography>
                        </Typography>
                    </Stack>


                </DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: "1em", gap: '2em' }}>
                    <Button sx={styleButtons} variant='contained' onClick={() => handleClose()} color='primary'>Cancelar</Button>
                    <Button sx={styleButtons} variant='contained' onClick={() => handleSucesss()}>Confirmar</Button>

                </Box>


            </Stack>


        </Dialog>


    )
}

export default ConfirmTicketsModal