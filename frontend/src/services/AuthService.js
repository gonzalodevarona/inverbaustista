import axios from '../config/AxiosBackend';
import Constants from '../utils/Constants';

const login = async (loginData) => {
    const res = await axios.post('/auth/login', loginData)
        .catch((error) => {
            console.log(error)
            return error.response;
        });

    return res.data.token
}
const isAdmin = async () => {
    const res = await axios.get('/auth/admin')
        .catch((error) => {
            console.log(error)
            return false;
        });

    return res.data ? res.data : false;
}


const AuthService = {
    login,
    isAdmin
}

export default AuthService;