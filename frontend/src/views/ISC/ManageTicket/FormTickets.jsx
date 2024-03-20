import { useState, useEffect } from 'react'
import React from 'react'
import { useForm } from "react-hook-form";
import * as XLSX from 'xlsx';
import { TextField, Typography, Box, Stack, MenuItem, Button } from "@mui/material";
import ReactHookFormSelect from '../../../components/ReactHookFormSelect';
import FileUploader from '../../../components/FileUploader';
import ToastAlert from '../../../components/Alerts/ToastAlert';
import ConfirmTicketsModal from './ConfirmTicketsModal';
import RaffleService from '../../../services/RaffleService';
import { mapToMenuItem } from '../../../utils/CommonFunctions';

function FormTickets() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ticketList, setTicketList] = useState([]);

  const [fileList, setFileList] = useState([]);

  const [raffles, setRaffles] = useState([]);


  const operations = [
    {
      value: 'add',
      label: '➕ Agregar números',
    },
    {
      value: 'delete',
      label: '➖ Eliminar números',
    }
  ];

  const methods = [
    {
      value: 'file',
      label: 'Archivo 📋',
    },
    {
      value: 'manual',
      label: 'Manual ✍️',
    }
  ];


  const { handleSubmit, setValue, control, watch, register, formState: { errors } } = useForm({
    defaultValues: {
      raffle: "",
      operation: "add",
      method: "file",
      tickets: ticketList
    },
  });


  const getSellableRaffles = async () => {
    let raffles = await RaffleService.getSellableRaffles();

    setRaffles(raffles);
  }

  useEffect(() => {
    getSellableRaffles();
  }, []);


  const chosenMethod = watch('method', false);

  const ticketsData = watch();


  useEffect(() => {
    setValue('tickets', [])
    if (chosenMethod === 'manual') {
      setFileList([]);
    }

  }, [chosenMethod])

  
  useEffect(() => {

    const concatenatedString = ticketList.map(item => item['#']).join(' - ');

    setValue('tickets', concatenatedString)

  }, [ticketList])




  const onSubmit = async (ticketsData) => { 

    if (ticketsData.tickets.length < 1) {
      await ToastAlert('top-right', 7000).fire({
        icon: 'error',
        title: 'Error: los números de los tickets a modificar no fueron cargados correctamente, revisa el texto manual que ingresaste o el archivo que cargaste'
      })
      return;
    } else { 
      handleOpen() 
    }

  };

  

  const formatRaffles = () => {
    return raffles.map(raffle => ({
      label: `${raffle.id}. ${raffle.name}`,
      value: `${raffle.id}. ${raffle.name}`
    }));
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((tickets) => {
      
      if (isValidTicket(tickets[0])) {
        setTicketList(tickets);
      } else{
        setTicketList([])
      }

    });
  };

  const isValidTicket = (ticket) => {
    return (
      typeof ticket === 'object' &&
      ticket.hasOwnProperty('#') &&
      ticket.hasOwnProperty('ZONA') &&
      typeof ticket['#'] === 'string' &&
      typeof ticket['ZONA'] === 'string'
    );
  };


  return (
    <Box sx={{ minWidth: chosenMethod === 'manual' ? { lg: '80em' } : { lg: '50em' } }}>

      <Typography sx={{ mt: { xs: '3em', md: "1em" } }} variant="h1" >Modificar tickets</Typography>

      <form id="raffleData" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack alignItems='center' spacing={3}>


          <ReactHookFormSelect
            id="raffle-select"
            name="raffle"
            label="Nombre del evento"
            control={control}
            errors={errors}
            errorText='un evento'
            fullWidth
          >
            {mapToMenuItem(formatRaffles())}
          </ReactHookFormSelect>

          <ReactHookFormSelect
            id="operation-select"
            name="operation"
            label="Operación"
            control={control}
            errors={errors}
            errorText='una operación'
            fullWidth
          >
            {mapToMenuItem(operations)}
          </ReactHookFormSelect>

          <ReactHookFormSelect
            id="method-select"
            name="method"
            label="Método de ingresar los números"
            control={control}
            errors={errors}
            errorText='un método de ingresar los números'
            fullWidth
          >
            {mapToMenuItem(methods)}
          </ReactHookFormSelect>


          {chosenMethod === 'manual' ?
            <TextField
              label="Ingresa los números de forma manual"
              type="text"
              required
              multiline
              minRows={5}
              maxRows={Infinity}
              {...register("tickets", {
                required: "Los números de los tickets son requeridos",
                pattern: { value: /^(?:-?\d{4}[cnCN])+(-?)$/, message: "Has introducido mal un número de ticket, sigue el patrón ####N o ####C" }

              })}
              error={!!errors.tickets}
              helperText={errors.tickets ? errors.tickets?.message : 'Por ejemplo: 1001N-2032C-4000N'}
              fullWidth
            />
            :
            <Box fullWidth>
              <FileUploader
                title="los archivos"
                fileList={fileList}
                setFileList={setFileList}
                listType='picture'
                fullWidth
                readExcel={readExcel}
                maxCount={1}
                accept='.csv, .xlsx'
              />
            </Box>

          }


          <Button fullWidth sx={{ maxWidth: '28em' }} variant='contained' type="Submit"  >
            Hacer modificación
          </Button>
        </Stack>
      </form>

      <ConfirmTicketsModal open={open} handleClose={handleClose} ticketsData={ticketsData} />
    </Box>
  )
}

export default FormTickets