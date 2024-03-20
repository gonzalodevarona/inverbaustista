import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Stack, Typography, Box, MenuItem } from "@mui/material";
import CONSTANTS from "../../utils/Constants";
import { useParams, useNavigate } from "react-router-dom";
import RaffleService from "../../services/RaffleService";
import TicketService from "../../services/TicketService";
import { calculateFinalPrice, parseDateToString } from "../../utils/CommonFunctions";
import { setLocalData } from "../../utils/CommonFunctions";


function PersonalInfo() {

  const navigate = useNavigate();

  const handleRedirectClick = (route) => {
    navigate('/' + route)
  };

  const [raffle, setRaffle] = useState({});

  const [isProcessingInfo, setIsProcessingInfo] = useState(false);

  let { id, quantity } = useParams();


  const [paymentData, setPaymentData] = useState({
    amount: null,
    raffleName: null,
    ticketsQuantity: parseInt(quantity),
  });


  const getRaffle = async () => {
    const res = await RaffleService.getRaffleById(id)

    if (res.status === 400 || res.errorMessage) {
      handleRedirectClick('404')
    }
    setRaffle(res)
  }


  useEffect(() => {

    async function checkIfRenderIsPossible() {
      if (quantity <= 5 && await TicketService.checkTicketAvailability(id, quantity)) {

        getRaffle();
      } else {
        handleRedirectClick('404')
      }
    }

    checkIfRenderIsPossible();

  }, []);



  useEffect(() => {

    if (raffle.pricePerTicket) {
      setPaymentData({
        ...paymentData,
        amount: calculateFinalPrice(quantity, raffle.pricePerTicket, raffle.discount),
        raffleName: raffle.name,
        raffleDrawEvent: raffle.drawEvent,
        raffleDrawDate: parseDateToString(raffle.drawDate, false),
        raffleId: raffle.id
      })
    }

  }, [raffle]);


  const defaultCountry = 'Colombia';
  const defaultIdType = 'CC';

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      idType: defaultIdType,
      idNumber: "",
      email: "",
      contactNumber: "",
      country: defaultCountry,
      state: "",
      city: "",
      address: "",
    },
  });

  const onSubmit = async (paymentPayload) => {
    setIsProcessingInfo(true);
    setLocalData(CONSTANTS.paymentDataKey, { ...paymentData, ...paymentPayload}, CONSTANTS.timeCacheToExpire);
    handleRedirectClick('checkout');
  };


  return (
    <Box sx={CONSTANTS.styleStackContainer}>

      <Typography sx={{ pb: '1em', }} variant="h1" >Información del comprador</Typography>

      <Box sx={CONSTANTS.sxResponsiveFlex}>

        <Box sx={{ flex: '0 0 50%' }}>
          <form id="paymentData" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack>
              <Typography sx={{ fontSize: "1.4rem", color: "label.main" }} variant='p'>Identificación</Typography>
              <Box sx={{ display: "flex", gap: "1.6em" }}>

                <TextField
                  select
                  required
                  sx={{ flex: '0 0 38%' }}
                  label="Tipo"
                  defaultValue={defaultIdType}
                  {...register("idType", { required: "El tipo de documento es requerido" })}
                  error={!!errors.idType}
                  helperText={errors.idType?.message}
                >
                  {CONSTANTS.idTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Número"
                  type="number"
                  required
                  sx={{ flex: '0 0 58%' }}
                  {...register("idNumber", {
                    required: "El número de documento es requerido",
                    valueAsNumber: true,
                    validate: (value) => value > 0 || "El número de documento debe ser válido",

                  })}
                  inputProps={{ min: 0 }}
                  error={!!errors.idNumber}
                  helperText={errors.idNumber?.message}
                />
              </Box>

              <TextField
                label="Nombre"
                type="text"
                required
                {...register("name", {
                  required: "El nombre es requerido", validate: {

                    matchPattern: (v) =>
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v) ||
                      "El nombre debe ser válido",
                  },
                  
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Apellido"
                type="text"
                required
                {...register("lastName", {
                  required: "El apellido es requerido", validate: {

                    matchPattern: (v) =>
                    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v) ||
                      "El apellido debe ser válido",
                  },
                  
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />


              <TextField
                label="Correo electrónico"
                type="email"
                required
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  validate: {

                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "El correo electrónico debe ser válido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Número de contacto"
                type="number"
                required
                {...register("contactNumber", {
                  required: "El número de contacto es requerido",
                  validate: {

                    minLength: (v) =>
                      v.length >= 10 || "El número de contacto debe ser válido",
                  },
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message}
              />

              <Box sx={{ display: "flex", gap: "1.6em" }}>
                <TextField
                  select
                  required
                  sx={{ flex: '0 0 38%' }}
                  label="País"
                  defaultValue={defaultCountry}
                  {...register("country", { required: "El país es requerido" })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {CONSTANTS.countries.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Departamento"
                  type="text"
                  required
                  sx={{ flex: '0 0 58%' }}
                  {...register("state", {
                    required: "El departamento es requerido",
                    matchPattern: (v) =>
                      /^[\p{L}\p{M}]+$/u.test(v) ||
                      "El nombre debe ser válido",
                  })}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Box>
              <TextField
                label="Ciudad"
                type="text"
                required
                {...register("city", {
                  required: "La ciudad es requerida",
                  matchPattern: (v) =>
                    /^[\p{L}\p{M}]+$/u.test(v) ||
                    "El nombre debe ser válido",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />

              <TextField
                label="Dirección"
                type="text"
                required
                {...register("address", { required: "La dirección es requerida" })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />

            </Stack>

          </form>

        </Box>
        <Stack sx={{ flex: '0 0 40%', mt: { xs: '10%', md: 0 }, border: 'solid 1px', height: '100%', py: '3em', px: '2em', borderRadius: '8px' }} >
          <Typography variant="subtitle1" >
            Resumen:
            <Typography display={'inline'} > {quantity}x Ticket{paymentData.ticketsQuantity > 1 ? "s" : ''} para el evento "{raffle.id}-{raffle.name}" </Typography>
          </Typography>

          <Typography variant="subtitle1" >
            Total: $
            {paymentData.amount ? new Intl.NumberFormat('es-CO').format(paymentData.amount) : '--.---'}
          </Typography>

          <Typography variant="subtitle1" >
            Nota:
            <Typography display={'inline'} > Los números de los tickets serán seleccionados al azar</Typography>
          </Typography>



          <LoadingButton variant='contained' form="paymentData" type="Submit" loading={isProcessingInfo} >
            Continuar con la compra
          </LoadingButton>

        </Stack>


      </Box>


    </Box>
  );

};



export default PersonalInfo;
