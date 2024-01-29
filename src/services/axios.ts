import axios from "axios";

import { SERVER_URL } from "../config/config";

const API_PATH = "api/v1/rest";

const instance = axios.create({
    baseURL: `${SERVER_URL}/${API_PATH}`,
    headers: {
        "Content-Type": "application/json",
    }
});


const axiosInstances = {
    instance
}

export default axiosInstances;