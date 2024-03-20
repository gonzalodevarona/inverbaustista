import axios from '../config/AxiosBackend';
import { parseDayjsToString } from '../utils/CommonFunctions';
import Constants from '../utils/Constants';

const getActiveRaffles = async () => {
    const res = await axios.get('/raffle')
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const getSellableRaffles = async () => {
    const res = await axios.get(`/raffle${Constants.adminPath}/sellable`)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const getActiveRafflesWithAvailableTickets = async () => {
    const res = await axios.get('/raffle/available')
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const getRaffleById = async (id) => {
    const res = await axios.get('/raffle/' + id)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const getAllRaffles = async () => {
    const res = await axios.get(`/raffle${Constants.adminPath}/all`)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const createRaffle = async (raffleParam, images) => {

    let raffle = {
        ...raffleParam,
        drawDate: parseDayjsToString(raffleParam.drawDate),
        status: 'SOLDOUT',
        tickets: [],
        images: [],

    }



    const res = await axios.post(`/raffle${Constants.adminPath}`, raffle)
        .catch((error) => console.log(error));

    if (res.data.id) {

        const form = new FormData();
        
        images.forEach(img => {
            form.append("images", img)
        })

        const resUpload = await axios.post(`/upload/${res.data.id}`, form)
            .catch((error) => console.log(error));
 
    }


    return res
}

const deleteRaffle = async (id) => {
    const res = await axios.delete(`/raffle${Constants.adminPrefix}/${id}`)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const editRaffle = async (id, raffleParam) => {

    let raffle = {
        ...raffleParam,
        tickets: []
    }

    const res = await axios.put(`/raffle${Constants.adminPrefix}/${id}`, raffle)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data
}

const RaffleService = {
    getActiveRaffles,
    getSellableRaffles,
    getActiveRafflesWithAvailableTickets,
    getRaffleById,
    getAllRaffles,
    createRaffle,
    editRaffle,
    deleteRaffle
}

export default RaffleService;