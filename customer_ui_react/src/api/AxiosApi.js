import axios from "axios";
import { baseUrl as baseURL } from "./baseUrl";
// import { DangerLeft } from "./toaster-service";

export const apiInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
apiInstance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // console.log(typeof error.response.data.message);
        if (typeof error.response.data.message === "string") {
            DangerLeft(error.response.data.message);
        } else {
            for (let i = 0; i < error.response.data.message.length; i++) {
                DangerLeft(error.response.data.message[i]);
            }
            return Promise.reject(error);
        }
    }
);
