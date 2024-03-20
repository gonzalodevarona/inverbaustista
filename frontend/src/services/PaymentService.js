import axios from '../config/AxiosBackend';

const generatePreference = async (preferenceData) => {
    const res = await axios.post('/pay', preferenceData)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}


const PaymentService = {
    generatePreference
}

export default PaymentService;