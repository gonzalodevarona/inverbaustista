import React, { useEffect, useState } from 'react'
import SaleService from '../../../services/SaleService'
import { Box, IconButton, Typography, Divider, Stack, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { parseDateToString } from '../../../utils/CommonFunctions'

function SalesModal({ isOpen, setIsOpen, client }) {


    const [sales, setSales] = useState([]);

    const getSales = async () => {
        let sales = await SaleService.getSalesByClientId(client.idNumber);

        setSales(sales);
    }

    const handleClose = () => {
        setIsOpen(false);
    }


    useEffect(() => {
        getSales();
    }, [client])

    const styleContentModal = {
        border: '2px solid frame',
        boxShadow: 10,
    };


    return (
        <Dialog
            open={isOpen}
            fullwidth
            scroll='paper'
            maxWidth='lg'
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={styleContentModal}
            PaperProps={{ sx: { borderRadius: "1.5em" } }}
        >


            <DialogTitle>
                <Typography sx={{m:0}} variant='subtitle1'>Ventas asociadas al cliente</Typography>
            </DialogTitle>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 20,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Stack>
                    <Typography variant='p'>Nombre: {client.name} {client.lastName}</Typography>
                    <Typography variant='p'>Documento de identidad: {client.idType} {client.idNumber}</Typography>
                    <Typography variant='p'>País: {client.country}</Typography>
                    <Typography variant='p'>Telefóno: {client.phoneNumber}</Typography>
                </Stack>
                {sales.length > 0 && sales.map((sale) => (

                    <Box key={sale.paymentRef}>

                        <Divider sx={{my:'2em'}} />
                        <Stack spacing={0}>
                            <Typography variant='subtitle1'>Referencia de pago: {sale.paymentRef}</Typography>
                            <Typography variant='p'>Fecha del pago: {parseDateToString(sale.date)}</Typography>
                            <Typography variant='p'>Monto: ${new Intl.NumberFormat('es-CO').format(sale.amount)}</Typography>
                            <Typography variant='p'>Tickets comprados:

                                {sale.tickets.map((ticket) => (
                                    <Typography variant='p'> {ticket.id} - </Typography>
                                ))}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </DialogContent>


        </Dialog>

    )
}

export default SalesModal