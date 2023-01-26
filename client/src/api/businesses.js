import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchBusinesses = async () => {
    return await axios.get(`${endpoint}/businesses`);
}

export const fetchBusinessById = async (id) => {
    return await axios.get(`${endpoint}/businesses/${id}`);
}

export const createBusiness = async (name) => {
    return await axios.post(`${endpoint}/businesses`, { name });
}

export const deleteBusiness = async (id) => {
    return await axios.delete(`${endpoint}/businesses/${id}`);
}

export const updateBusinessApi = async (id, updates) => {
    return await axios.put(`${endpoint}/businesses/${id}`, updates);
}