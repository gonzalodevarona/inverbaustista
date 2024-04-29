import { useState, useEffect } from 'react';
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Check from '../../assets/images/check.png';
import Cross from '../../assets/images/cross.png';

function Result() {

    const navigate = useNavigate();



    const handleRedirectClick = (route) => {
        navigate('/' + route)
    };

    const [isApprovedPayment, setIsApprovedPayment] = useState({});
    const [paymentId, setPaymentId] = useState("");



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        setPaymentId(urlParams.get("payment_id"));
        setIsApprovedPayment((urlParams.get("status") == undefined && 
        urlParams.get("payment_id")) ? true : false);

    }, [])


    const body16 = { fontSize: '16px' };
    return (
        <Box>

            <Box
                component="img"
                alt={isApprovedPayment ? "Pago aprobado" : "Pago no aprobado"}
                src={isApprovedPayment ? Check : Cross}
            />
            <Typography sx={{ mt: '10%' }} variant="h1" m={0}>Pago {!isApprovedPayment && "no"} aprobado</Typography>

            <Typography sx={{ textAlign: 'center' }} variant="subtitle1">
                ID del pago: {paymentId}
            </Typography>
            <Typography sx={{ textAlign: 'center', mb: '2em' }} variant="subtitle1">
                Tu compra {!isApprovedPayment && 'no'} fue exitosa.
            </Typography>


            {isApprovedPayment ?
                <>
                    <Typography sx={body16}>
                        Te llegará un correo con los detalles de tu compra y tus números asignados
                    </Typography>
                    <Typography sx={body16}>¡Te deseamos mucha suerte!</Typography>
                </> :
                <Typography sx={body16}>Puedes intentar comprar de nuevo</Typography>}




            <Button sx={{ mt: 4 }} variant="contained" href={isApprovedPayment ? "/" : "/raffles"}>Volver a la página principal</Button>
        </Box>
    )
}

export default Result

