import axios from '../config/AxiosBackend';
import Constants from '../utils/Constants';

const getAllClients = async () => {
    const res = await axios.get(`/client${Constants.adminPath}`)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}


const ClientService = {
    getAllClients
}

export default ClientService;