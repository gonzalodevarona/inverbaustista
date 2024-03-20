import axios from '../config/AxiosBackend';
import Constants from '../utils/Constants';

const getSalesByClientId = async (clientId) => {
    const res = await axios.get(`/sale/admin/${clientId}`)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}


const SaleService = {
    getSalesByClientId
}

export default SaleService;