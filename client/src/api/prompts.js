import { endpoint } from './config';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchPrompts = async () => {
    return await axios.get(`${endpoint}/prompts`);
}

export const fetchPromptById = async (id) => {
    return await axios.get(`${endpoint}/prompts/${id}`);
}

export const createPrompt = async (folderId) => {
    return await axios.post(`${endpoint}/prompts`, { folderId });
}

export const deletePrompt = async (id) => {
    return await axios.delete(`${endpoint}/prompts/${id}`);
}

export const updatePromptApi = async (id, updates) => {
    return await axios.put(`${endpoint}/prompts/${id}`, updates);
}