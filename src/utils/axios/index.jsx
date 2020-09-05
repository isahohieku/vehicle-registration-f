import axios from 'axios';
import { getToken } from '../helpers';

const baseURL = 'https://dotmac-backend.herokuapp.com/api/';
// const baseURL = 'http://localhost:4000/api/';

const setHeader = () => {
    const config = {
        headers: {
            authorization: `${getToken()}`,
            'Content-Type': 'application/json'
        } 
    }
    return config;
}

const getRequest = (url) => axios.get(`${baseURL}${url}`, setHeader());

const postRequest = (url, data) => axios.post(`${baseURL}${url}`, data, setHeader());

const updateRequest = (url, data) => axios.put(`${baseURL}${url}`, data, setHeader());

const deleteRequest = (url) => axios.delete(`${baseURL}${url}`, setHeader());   

export { getRequest, postRequest, updateRequest, deleteRequest }  