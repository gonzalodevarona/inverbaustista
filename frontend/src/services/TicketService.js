import axios from '../config/AxiosBackend';
import { downloadExcel, formatTicketsToExcel, formatSoldTicketsToExcel } from '../utils/CommonFunctions';
import Constants from '../utils/Constants';

const countTicketsFiltered = async (raffleId, ticketStatus) => {
    const status = ticketStatus ? ticketStatus.toUpperCase() : 'AVAILABLE'

    const res = await axios.get(`/ticket${Constants.adminPath}/${raffleId}/count?status=${status}`)
        .catch((error) => console.log(error));

    return res.data
}

const countAllTickets = async (raffleId) => {
    const res = await axios.get(`/ticket${Constants.adminPath}/${raffleId}/count/all`)
        .catch((error) => console.log(error));

    return res.data
}

const checkTicketAvailability = async (raffleId, quantity) => {
    const res = await axios.get(`/ticket/${raffleId}/checkAvailability`, {
        params: {quantity}
    })
        .catch((error) => console.log(error));

    return res.data
}


const addTickets = async (raffle, tickets) => {

    const res = await axios.post(`/ticket${Constants.adminPath}/add`, {tickets}, {
        params: {raffle}
    } )
        .catch((error) => console.log(error));

    return res
}

const getAvailableTicketsAndDelete = async (raffleId) => {
    const res = await axios.delete(`/ticket${Constants.adminPath}/available/${raffleId}`)
        .catch((error) => console.log(error));

    downloadExcel(`Disponibles_Evento#${raffleId}`, formatTicketsToExcel(res.data))

}

const getTicketsByRaffleIdAndStatus = async (raffleId, status, fileName) => {
    const res = await axios.get(`/ticket${Constants.adminPath}/raffleid/${raffleId}?status=${status}`)
        .catch((error) => console.log(error));
    downloadExcel(`${fileName}_Evento#${raffleId}`, formatTicketsToExcel(res.data))
}

const getSoldTicketsByRaffleId = async (raffleId) => {
    const res = await axios.get(`/ticket${Constants.adminPath}/raffleid/${raffleId}/sold`)
        .catch((error) => console.log(error));
    downloadExcel(`Vendidas_Evento#${raffleId}`, formatSoldTicketsToExcel(res.data))
}

const deleteTickets = async (raffle, tickets) => {
    
    const res = await axios.delete(`/ticket${Constants.adminPath}/delete?raffle=${raffle}`, {
        data: {tickets},
      } )
        .catch((error) => console.log(error));

    return res
}

const TicketService = {
    getAvailableTicketsAndDelete,
    getTicketsByRaffleIdAndStatus,
    getSoldTicketsByRaffleId,
    countTicketsFiltered,
    countAllTickets,
    checkTicketAvailability,
    addTickets,
    deleteTickets
}

export default TicketService;
