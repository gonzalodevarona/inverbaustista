import { useState, useCallback, useEffect } from 'react'
import { Button, Stack, Box, Typography, } from "@mui/material";
import { downloadExcel } from "../../../utils/CommonFunctions";
import CustomTable from '../../../components/CustomTables';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../../services/ClientService';
import SalesModal from './SalesModal';


function ManageClient() {
    const navigate = useNavigate();

    const handleRedirectClick = (route) => {
        navigate('/isc/' + route)
    };

    const [isOpen, setIsOpen] = useState(false);
    const [client, setClient] = useState({});
    


    
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        let clients = await ClientService.getAllClients(true);

        setClients(clients);
    }

    useEffect(() => {
        
        getClients();
    }, []);

    const handleSalesModal = (chosenClient) => {
        setClient(chosenClient);
        setIsOpen(true);
    }

    function formatClients() {
        
        return clients.map(client => ({
            tipo_doc: client.idType,
            documento: client.idNumber,
            nombre: client.name,
            apellido: client.lastName,
            celular: client.phoneNumber,
            pais: client.country,
            departamento: client.state,
            ciudad: client.city,
            direccion: client.address
        }));
        
    }

    const exportFile = useCallback((fileName) => {
        downloadExcel(fileName, formatClients())
    }, [clients]);



   

    return (
        <Stack spacing={5}>
            <Typography variant='h1'>Administrar clientes</Typography>
            <Box>
                <CustomTable sx={{ mt: '5em' }} title='Clientes' page='clients' parentAction={handleSalesModal}
                    columns={[
                        { title: 'Tipo de documento', field: 'idType' },
                        { title: 'Número de documento', field: 'idNumber', type: 'numeric' },
                        { title: 'Nombre', field: 'name' },
                        { title: 'Apellido', field: 'lastName' },
                        { title: 'Teléfono', field: 'phoneNumber', type: 'numeric' },
                        { title: 'Email', field: 'email'},
                        { title: 'País', field: 'country'},
                        { title: 'Departamento', field: 'state'},
                        { title: 'Ciudad', field: 'city'},
                        { title: 'Dirección', field: 'address'}
                    ]} data={clients} />
            </Box>
            <Button sx={{ maxWidth: '40%' }} fullWidth variant='contained' onClick={() => exportFile('Clientes_ISC')}>
               <DownloadIcon></DownloadIcon> Descargar excel con clientes
            </Button>

            {isOpen && <SalesModal isOpen={isOpen}setIsOpen={setIsOpen} client={client}/>}
            

        </Stack>
    )
}

export default ManageClient