import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchTemplates = async () => {
    return await axios.get(`${endpoint}/templates`);
}

export const fetchTemplateById = async (id) => {
    return await axios.get(`${endpoint}/templates/${id}`);
}

export const createTemplate = async () => {
    return await axios.post(`${endpoint}/templates`);
}

export const deleteTemplate = async (id) => {
    return await axios.delete(`${endpoint}/templates/${id}`);
}

export const updateTemplateApi = async (id, updates) => {
    return await axios.put(`${endpoint}/templates/${id}`, updates);
}