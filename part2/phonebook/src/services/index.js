import axios from 'axios';

const dbUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(dbUrl);
    const response = await request;
    return response.data;
};

const create = async newObject => {
    const request = axios.post(dbUrl, newObject);
    const response = await request;
    return response.data;
};

const update = async (id, newObject) => {
    const request = axios.put(`${dbUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
}

const destroy = id => {
    return axios.delete(`${dbUrl}/${id}`);
}

export default {getAll, create, update, destroy}