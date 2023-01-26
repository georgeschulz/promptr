import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchOffers = async () => {
    return await axios.get(`${endpoint}/offers`);
}

export const fetchOfferById = async (id) => {
    return await axios.get(`${endpoint}/offers/${id}`);
}

export const createOffer = async () => {
    return await axios.post(`${endpoint}/offers`);
}

export const deleteOffer = async (id) => {
    return await axios.delete(`${endpoint}/offers/${id}`);
}

export const updateOfferApi = async (id, updates) => {
    return await axios.put(`${endpoint}/offers/${id}`, updates);
}