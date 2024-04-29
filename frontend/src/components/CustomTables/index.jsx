import MaterialTable from 'material-table';
import { forwardRef } from "react";
import { ThemeProvider } from '@mui/material/styles';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import theme from '../../utils/theme';
import { Typography } from '@mui/material';
import ConfirmationAlert from '../../components/Alerts/ConfirmationAlert'
import RaffleService from '../../services/RaffleService';
import TicketService from '../../services/TicketService';
import SalesModal from '../../views/ISC/ManageClient/SalesModal';




function CustomTable({ title, page, sx, columns, data, parentAction }) {


    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/isc/'+route)
    };

    const tableIcons = {

        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} color='action' />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    

    const editTicketsAction = {
        icon: () => <ConfirmationNumberIcon fontSize='large' />,
        tooltip: 'Modificar tickets',
        onClick: (event, rowData) => handleRedirectClick('ticket/edit')
    }

    const downloadAvailableTicketsAction = {
        icon: () => <GetAppIcon fontSize='large' />,
        tooltip: 'Descargar tickets disponibles',
        onClick: (event, rowData) => {TicketService.getTicketsByRaffleIdAndStatus(rowData.id, 'available', 'Disponibles '); parentAction()}
    }
    const downloadSoldTicketsAction = {
        icon: () => <CreditScoreIcon fontSize='large' />,
        tooltip: 'Descargar tickets vendidos',
        onClick: (event, rowData) => {TicketService.getTicketsByRaffleIdAndStatus(rowData.id, 'sold', 'Vendidas'); parentAction()}
    }

    const downloadAndDeleteAvailableTicketsAction = {
        icon: () => <DeleteSweepIcon fontSize='large' />,
        tooltip: 'Descargar y eliminar tickets disponibles',
        onClick: (event, rowData) => {TicketService.getAvailableTicketsAndDelete(rowData.id); parentAction()}
    }

    const editRaffleAction = {
        icon: () => <EditRoundedIcon fontSize='large' />,
        tooltip: 'Editar evento',
        onClick: (event, rowData) => handleRedirectClick(`raffle/edit/${rowData.id}`)
    }

    const viewSalesFromClient = {
        icon: () => <ShoppingCartCheckoutIcon fontSize='large' />,
        tooltip: 'Ver ventas asociadas',
        onClick: (event, rowData) => parentAction(rowData)
    }



    const deleteRaffleAction = {
        icon: () => <DeleteIcon fontSize='large' style={{ color: 'red' }} />,
        tooltip: 'Borrar evento',
        onClick: (event, rowData) => {
            ConfirmationAlert(rowData,'¿Estas seguro que quieres eliminar el evento?',
                `A continuación vas a eliminar el evento: ${rowData.id}. ${rowData.name}`,
                'Evento eliminado!',
                `Has eliminado el evento: ${rowData.id}. ${rowData.name}`,
                RaffleService.deleteRaffle
                
            );
            
        }
    }

    const setActions = () => {
        let actions = []

        switch (page) {
            case 'dashboard':
                actions.push(editTicketsAction);
                actions.push(editRaffleAction);
                break;

            case 'raffles':
                actions.push(editTicketsAction);
                actions.push(editRaffleAction);
                actions.push(deleteRaffleAction);
                break;
            case 'tickets':
                actions.push(editTicketsAction);
                actions.push(downloadAvailableTicketsAction);
                actions.push(downloadSoldTicketsAction);
                actions.push(downloadAndDeleteAvailableTicketsAction);
                break;
            case 'clients':
                actions.push(viewSalesFromClient);
                break;

            default:
                break;
        }

        return actions;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={sx}>
                <MaterialTable
                    icons={tableIcons}
                    title={<Typography sx={{ m: 0 }} variant='h1'>{title}</Typography>}
                    columns={columns}
                    data={data}
                    options={{
                        headerStyle: {
                            backgroundColor: theme.palette.primary.light,
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        toolbarStyle: {
                            backgroundColor: theme.palette.primary.light,

                        },
                        rowStyle: {
                            fontSize: 16,
                        },
                        actionsColumnIndex: -1
                    }}
                    localization={{
                        toolbar: {
                            searchPlaceholder: "Buscar"
                        },
                        header: {
                            actions: 'Acciones'
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'filas',
                            labelRowsPerPage: 'Filas por página:',
                            firstAriaLabel: 'Primera página',
                            firstTooltip: 'Primera página',
                            previousAriaLabel: 'Página anterior',
                            previousTooltip: 'Página anterior',
                            nextAriaLabel: 'Página siguiente',
                            nextTooltip: 'Página siguiente',
                            lastAriaLabel: 'Última página',
                            lastTooltip: 'Última página'
                        },
                        body:{
                            emptyDataSourceMessage: (<Typography variant='p'>No hay datos para mostrar</Typography>)
                        }

                    }}
                    actions={setActions()}
                />
            </Box>
            
        </ThemeProvider>

    )
}

export default CustomTable