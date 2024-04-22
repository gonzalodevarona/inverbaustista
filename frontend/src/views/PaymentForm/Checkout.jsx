import { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";
import { getLocalData, parseDateToString } from '../../utils/CommonFunctions';
import CONSTANTS from '../../utils/Constants';
import PaymentService from "../../services/PaymentService";



function Checkout() {

    const theme = useTheme();
    const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/' + route)
    };

    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-CO' });
    const [preference, setPreference] = useState({});
    const paymentData = getLocalData(CONSTANTS.paymentDataKey);

    useEffect(() => {
        const generatePreference = async () => {
            let paymentArgs = {
                payerDto: {
                    name: paymentData.name,
                    surname: paymentData.lastName,
                    phone: paymentData.contactNumber,
                    country: paymentData.country,
                    address: `${paymentData.address}. ${paymentData.city}. ${paymentData.country}`,
                    email: paymentData.email,
                    idType: paymentData.idType,
                    idNumber: paymentData.idNumber
                },

                itemsDto: [{
                    title: "Compra de tickets para el evento: " + paymentData.raffleName,
                    description: `${paymentData.ticketsQuantity} ticket ${paymentData.ticketsQuantity > 1 ? "s" : ''} para el evento`,
                    drawDate: paymentData.raffleDrawDate,
                    drawEvent: paymentData.raffleDrawEvent,
                    raffleId: paymentData.raffleId,
                    pictureUrl: "https://images.vexels.com/media/users/3/321263/isolated/preview/c3f14085fdb4060c8a4c7313055b9e02-icono-de-entradas-de-cine.png",
                    categoryId: CONSTANTS.categoryTickets,
                    quantity: paymentData.ticketsQuantity,
                    currencyId: "COP",
                    unitPrice: Number(paymentData.amount) / Number(paymentData.ticketsQuantity)
                }]
            };

            setPreference(await PaymentService.generatePreference(paymentArgs));
        }

        if (paymentData && Object.keys(paymentData).length > 0) {
            generatePreference();
        } else {
            handleRedirectClick('404')
        }


    }, [])


    return (
        paymentData &&

        <Grid container width={isMediumSize?'auto':'100em'}sx={{ my: '2%', border: 'solid 1px', borderColor: 'primary', borderRadius: '8px'  }} spacing={2}>
            <Grid item xs={12} >
                <Typography variant="h1" >
                    Resumen de tu compra

                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" >
                    Información del evento
                </Typography>
                <Stack spacing={1}>
                    <Typography variant="subtitle1" >
                        Nombre:
                        <Typography display={'inline'} > {paymentData.raffleName} </Typography>
                    </Typography>

                    <Typography variant="subtitle1" >
                        Fecha en que juega:
                        <Typography display={'inline'} > {paymentData.raffleDrawDate} </Typography>
                    </Typography>

                    <Typography variant="subtitle1" >
                        Número de tickets:
                        <Typography display={'inline'} > {paymentData.ticketsQuantity} </Typography>
                    </Typography>

                    <Typography variant="subtitle1" >
                        Total:
                        <Typography display={'inline'} > $ {new Intl.NumberFormat('es-CO').format(paymentData.amount)} </Typography>
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" >
                    Información del comprador
                </Typography>
                <Stack spacing={1}>
                    <Typography variant="subtitle1" >
                        Nombre:
                        <Typography display={'inline'} > {paymentData.name} {paymentData.lastName}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" >
                        Identificación:
                        <Typography display={'inline'} > {paymentData.idType} {paymentData.idNumber}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" >
                        Correo electrónico:
                        <Typography display={'inline'} > {paymentData.email}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" >
                        Número de contacto:
                        <Typography display={'inline'} > {paymentData.contactNumber}</Typography>
                    </Typography>
                    <Typography variant="subtitle1" >
                        Dirección:
                        <Typography display={'inline'} > {paymentData.address}, {paymentData.city}, {paymentData.state} - {paymentData.country}</Typography>
                    </Typography>
                </Stack>
            </Grid>

            <Grid item xs={12} >
                {preference.id && <Wallet initialization={{ preferenceId: preference.id }} customization={{

                    visual: { horizontalPadding: '200%' }
                }} />}
            </Grid>

        </Grid>
    )
}

export default Checkout