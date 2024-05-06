import { useState } from 'react'
import React from 'react'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography, Box, Stack, InputAdornment } from "@mui/material";
import Constants from '../../../utils/Constants';
import FileUploader from '../../../components/FileUploader';
import FormDateTimePicker from '../../../components/FormDateTimePicker';
import RaffleService from '../../../services/RaffleService';
import { parseDateToDayjs, mapToMenuItem } from '../../../utils/CommonFunctions'
import ReactHookFormSelect from '../../../components/ReactHookFormSelect';

function FormRaffle({ mode }) {

  const navigate = useNavigate();

  const handleRedirectClick = (route) => {
    navigate('/isc/' + route)
  };

  let { id } = useParams();


  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const tomorrow = dayjs().add(1, 'day');

  

  const possibleStatus = [
    {
      value: 'ACTIVE',
      label: 'Activo',
    },
    {
      value: 'SOLDOUT',
      label: 'Sin tickets',
    },
    {
      value: 'COMPLETED',
      label: 'Completado',
    },
    {
      value: 'INACTIVE',
      label: 'Inactivo',
    },
    {
      value: 'POSTPONED',
      label: 'Pospuesto',
    }
  ];


  const { handleSubmit, register, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: async () => {
      let valuesObj = {
        name: "",
        description: "",
        pricePerTicket: "",
        discount: "",
        drawDate: "",
        drawEvent: "",
        status: "ACTIVE",
        
      };

      if (id) {
        const res = await RaffleService.getRaffleById(id)
        valuesObj.name = res.name;
        valuesObj.description = res.description;
        valuesObj.pricePerTicket = res.pricePerTicket;
        valuesObj.discount = res.discount;
        valuesObj.status = res.status;
        valuesObj.drawEvent = res.drawEvent;
        valuesObj.drawDate = parseDateToDayjs(res.drawDate);
      }

      return valuesObj;
    }
  });


  const chosenStatus = watch('status', false);



  const onSubmit = async (raffleData) => {
    setLoading(true);
    if(mode === 'create'){
      RaffleService.createRaffle(raffleData, fileList);
    } else if(mode === 'edit'){
      RaffleService.editRaffle(id, raffleData);
    }
    
    handleRedirectClick('raffle')
  };

  const conditionalShrink = mode == 'edit' ? { shrink: true } : null;
  const conditionalDisable = mode == 'edit' ? true : false;

  return (
    <Box minWidth={{ md: '50em' }}>

      <form id="raffleData" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h1" >{mode === "create" ? "Crear" : "Modificar"} evento</Typography>

        <Box sx={Constants.sxResponsiveFlex}>
          <Stack sx={{ minWidth: { lg: '50em' } }}>
            <TextField
              label="Nombre"
              type="text"
              required
              disabled={conditionalDisable}
              InputLabelProps={conditionalShrink}
              {...register("name", {
                required: "El nombre es requerido"
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <FormDateTimePicker
              name="drawDate"
              label="¿Cuando juega?"
              control={control}

              minDate={tomorrow}
              disabled={conditionalDisable}
              disablePast={true}
            />

            <TextField
              label="¿Con qué juega?"
              type="text"
              required
              disabled={conditionalDisable}
              {...register("drawEvent", {
                required: "El evento con que juega el sorteo es requerido"
              })}
              InputLabelProps={conditionalShrink}
              error={!!errors.drawEvent}
              helperText={errors.drawEvent?.message}
            />


            {mode === 'edit' ?
              <ReactHookFormSelect
                id="status-select"
                name="status"
                label="Estado"
                control={control}
                defaultValue={chosenStatus}
                errors={errors}
                errorText='un estado'
                fullWidth
              >
                {mapToMenuItem(possibleStatus)}
              </ReactHookFormSelect>
              : null}


            <TextField
              label="Descripción"
              type="text"
              required
              multiline
              minRows={5}
              maxRows={Infinity}
              {...register("description", {
                required: "La descripción es requerida"
              })}
              InputLabelProps={conditionalShrink}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Precio por ticket"
              type="number"
              required
              {...register("pricePerTicket", {
                required: "El precio por ticket es requerido"
              })}
              error={!!errors.pricePerTicket}
              helperText={errors.pricePerTicket?.message}
              InputLabelProps={conditionalShrink}
              InputProps={{
                startAdornment:
                  <InputAdornment disableTypography sx={{ fontSize: '1.4rem' }} position="start">
                    $
                  </InputAdornment>
              }}

            />

            <TextField
              label="Descuento a partir de 2 tickets"
              type="number"
              required
              {...register("discount", {
                required: "El descuento a partir de 2 tickets es requerido"
              })}
              error={!!errors.discount}
              helperText={errors.discount?.message}
              InputLabelProps={conditionalShrink}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end" disableTypography sx={{ fontSize: '1.4rem' }} >
                    %
                  </InputAdornment>
              }}
            />

          </Stack>

          <Stack>

            <Box sx={{ maxWidth: "40em" }}>
              <FileUploader
                title="las imagenes"
                disabled={loading}
                fileList={fileList}
                setFileList={setFileList}
                listType='picture'
                accept='.png, .jpeg, .jpg'
                maxCount='5'
              />
            </Box>
            <LoadingButton variant='contained' type="Submit" loading={loading} >
              {mode === 'create'?'Crear': 'Guardar cambios'}
            </LoadingButton>
          </Stack>

        </Box>

      </form>

    </Box>
  )
}

export default FormRaffle