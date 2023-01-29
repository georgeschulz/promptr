import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchFolders = async () => {
    return await axios.get(`${endpoint}/folders`);
}

export const fetchFolderById = async (id) => {
    return await axios.get(`${endpoint}/folders/${id}`);
}

export const createFolder = async (name) => {
    return await axios.post(`${endpoint}/folders`, { name });
}

export const deleteFolder = async (id) => {
    return await axios.delete(`${endpoint}/folders/${id}`);
}

export const updatePromptFolder = async (id, folderId) => {
    return await axios.put(`${endpoint}/folders/location/${id}`, { folderId });
}