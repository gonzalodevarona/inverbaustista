import axios from "axios";
import { getLocalData } from "../utils/CommonFunctions";
import Constants from "../utils/Constants";


const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API
});

export default instance;


