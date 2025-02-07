import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
// import {baseUrl} from '../../Baseurl';
// import {toast} from 'react-hot-toast';


const serverType = 'development'; //production //development

// console.log('token in axios',token);

const USERNAME = '';
const PASSWORD = '';
const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);

interface CustomHeaders {
    [key: string]: string;
}

// Create a typed Axios instance function
export const axiosInstance = (
    endPoint?: string,
    params?: unknown,
    method?: string,
    headers: CustomHeaders = {},
    body?: unknown
): Promise<AxiosResponse<unknown>> => {
    const base = "";

    // Validate endpoint
    if (!endPoint) {
        throw new Error('Endpoint is required.');
    }

    // Create Axios instance
    const instance: AxiosInstance = axios.create({
        baseURL: base,
        method,
        params,
        headers: {
            ...headers,
            Authorization: headers.Authorization || `Basic ${basicAuth}`,
        },
        url: endPoint,
        data: body,
    });

    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            let accessToken;
            if (config.url === 'auth/signup' || config.url === 'auth/signup-foreign') {
                // accessToken = getCookie('signUp_token');
            } else {
                // accessToken = getCookie('access_token');
            }
            const access_token = accessToken && `Bearer ${accessToken}`;
            config.headers.Authorization = access_token;
            return config;
        },
        (error) => {
            console.error('Request error:', error);
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            // toast?.error(response?.data?.responseMessageFa);
            return response;
        },
        (error) => {
            console.error('Response error:', error);


            return Promise.reject(error);
        }
    );

    return instance.request({
        url: endPoint,
        params,
        method,
        data: body,
    });
};

export const Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
};