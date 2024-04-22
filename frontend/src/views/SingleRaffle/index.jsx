import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import CONSTANTS from "../../utils/Constants";
import Carousel from 'react-material-ui-carousel';

import DefaultPicture from "../../assets/images/tickets.png";
import ToastAlert from "../../components/Alerts/ToastAlert"
import RaffleService from "../../services/RaffleService";
import { calculateFinalPrice } from "../../utils/CommonFunctions";
import TicketService from "../../services/TicketService";
import { parseDateToString } from "../../utils/CommonFunctions";

function SingleRaffle() {

  dayjs.locale('es');

  const theme = useTheme();
  const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const handleRedirectClick = (route) => {
    navigate('/' + route)
  };


  const [raffle, setRaffle] = useState({});
  const [loading, setLoading] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false });
  const [disabled, setDisabled] = useState(false);
  let { id } = useParams();



  const getRaffle = async () => {
    const res = await RaffleService.getRaffleById(id)

    if (res.status === 400 || res.errorMessage || res.status !== 'ACTIVE') {
      handleRedirectClick('404')
    }
    setRaffle(res);
  }


  useEffect(() => {

    getRaffle();

  }, []);





  const handleClick = async (quantity) => {

    if (await TicketService.checkTicketAvailability(raffle.id, quantity)) {
      setLoading({ ...loading, [quantity]: true });
      setDisabled(true);
      handleRedirectClick(`info/${id}/${quantity}`)
    } else {
      ToastAlert('bottom-right', 4000).fire({
        icon: 'error',
        title: 'Error: no hay disponibles la cantidad de tickets que deseas comprar, intenta de nuevo con menos'
      })
    }

  };

  return (
    <Stack spacing={{ xs: 5, md: 0 }} sx={[CONSTANTS.sxResponsiveFlex, CONSTANTS.styleStackContainer, { maxHeight: "100%" }]}>


      <Stack width={isMediumSize ? 'auto' : '100em'}>
        <Typography variant="h1">Evento {raffle.name}</Typography>
        {raffle?.images?.length > 0 ?
          <Carousel
            autoPlay
            swipe
            navButtonsAlwaysVisible
          >
            {raffle.images.map((image) => (
              <Box
                disabled
                key={image}
                component='img'
                height={isMediumSize ? 'auto' : '70vh'}
                width={isMediumSize ? '100%' : 'auto'}
                src={image.url}
              />
            ))}
          </Carousel>
          : <Box component='img' src={DefaultPicture} />}
      </Stack>
      <Stack sx={{ border: 'solid 1px', borderColor: 'primary', borderRadius: '8px' }} >

        <Stack alignItems="center" padding='2em'>
          {raffle.pricePerTicket &&
            Array.from({ length: 5 }, (_, index) => (
              <LoadingButton
                fullWidth
                onClick={() => handleClick(index + 1)}
                variant='contained'
                loading={loading[index + 1]}
                disabled={disabled}
                key={index}
              >
                Comprar {index + 1} ticket{index > 0 ? "s" : ""} x ${new Intl.NumberFormat('es-CO').format(calculateFinalPrice(index + 1, raffle.pricePerTicket, raffle.discount))}
              </LoadingButton>
            ))
          }
        </Stack>

        <Stack padding='2em' sx={{ textAlign: "start" }} >
          <Typography variant="subtitle1" >
            Juega:
            {raffle.drawDate && <Typography display={'inline'} > {parseDateToString(raffle.drawDate, false)}  </Typography>}
          </Typography>

          <Typography variant="subtitle1" >
            Con:
            <Typography display={'inline'} > {raffle.drawEvent}  </Typography>
          </Typography>

          <Typography variant="subtitle1" >
            Descripción:
            <Typography display={'inline'} > {raffle.description}  </Typography>
          </Typography>
        </Stack>



      </Stack>

    </Stack>

  );
}

export default SingleRaffle