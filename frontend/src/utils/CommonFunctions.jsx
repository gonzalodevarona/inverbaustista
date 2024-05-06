import { useNavigate } from 'react-router-dom';
import CONSTANTS from "../utils/Constants";
import dayjs from 'dayjs';
import { es } from "dayjs/locale/es";
import { MenuItem } from "@mui/material";
import { read, utils, writeFileXLSX } from 'xlsx';
import { KeyboardReturnRounded } from '@material-ui/icons';


export function handleNavigate(route) {
    const navigate = useNavigate();
    navigate(`/${route}`);
};

export function calculateFinalPrice(quantity, unitPrice, discount) {
    return quantity > 1 ? quantity * unitPrice * ((100 - discount) / 100) : unitPrice;
}

export const getAxiosBearerToken = () => {
    
    return {
        headers: { Authorization: `Bearer ${getLocalData(CONSTANTS.tokenKey)}` }
    };
}

export const getLocalData = (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}



export const setLocalData = (key, data, timeToExpire) => {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: data,
        expiry: now.getTime() + timeToExpire,
    }
    localStorage.setItem(key, JSON.stringify(item))

};



export const removeLocalData = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log(`Error al eliminar la clave [${key}] de localStorage: ${JSON.stringify(e)}`);
        return false;
    }
    return true;
}


export function translateRafflesStatus(raffles) {

    raffles.forEach(raffle => {
        raffle.status = translateSingleRaffleStatus(raffle.status);
    });
    console.log(raffles);
    return raffles;
}

export function parseDayjsToString(dayjsObj) {

    return dayjsObj.format().toString().substring(0, 19);
}

export function parseDateToString(dateArray, includeTime = true) {
    dayjs.locale("es");
    const dayjsObj = dayjs(`${dateArray[0]}-${dateArray[1]}-${dateArray[2]} ${dateArray[3]}:${dateArray[4]}`);

    if (includeTime) {
        return dayjsObj.format('dddd, MMMM D, YYYY h:mm A');
    } else {
        return dayjsObj.format('dddd, MMMM D, YYYY');
    }
}


export function parseDateToDayjs(dateArray) {

    const dayjsObj = dayjs(`${dateArray[0]}-${dateArray[1]}-${dateArray[2]} ${dateArray[3]}:${dateArray[4]}`);

    return dayjsObj;
}

export function mapToMenuItem(array) {
    return array.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    ))
}

export function downloadExcel(fileName, data) {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${fileName}.xlsx`);
}

export function formatTicketsToExcel(tickets) {
    return tickets.map(item => ({
        '#': item.number + item.city[0],
        ZONA: item.city === 'CALI' ? item.city : 'NVALLE'
    }));
}

export function formatSoldTicketsToExcel(tickets) {
    return tickets.map(item => ({
        '#': item.ticketDto.number + item.ticketDto.city[0],
        ZONA: item.city === 'CALI' ? item.city : 'NVALLE',
        COMPRADOR: `${item.clientDto.name} ${item.clientDto.lastName}`,
        TELEFONO: item.clientDto.phoneNumber,
        DOCUMENTO: `${item.clientDto.idType} ${item.clientDto.idNumber}`,
        EMAIL: item.clientDto.email,
    }));
}

export function translateSingleRaffleStatus(status) {
    status = status.toUpperCase();

    switch (status) {
        case 'ACTIVE':
            return 'Activo';
            break;

        case 'COMPLETED':
            return 'Completado';
            break;

        case 'INACTIVE':
            return 'Inactivo';
            break;

        case 'POSTPONED':
            return 'Pospuesto';
            break;

        case 'SOLDOUT':
            return 'Sin tickets';
            break;

        default:
            break;
    }
}




