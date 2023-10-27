import axios from 'axios';

const dbUrl = 'http://localhost:3001/api/persons';

export const getAll = async () => {
    const request = axios.get(dbUrl);
    const response = await request;
    return response.data;
};

export const create = async newObject => {
    const request = axios.post(dbUrl, newObject);
    const response = await request;
    return response.data;
};

export const update = async (id, newObject) => {
    const request = axios.put(`${dbUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
}

export const destroy = id => {
    return axios.delete(`${dbUrl}/${id}`);
}