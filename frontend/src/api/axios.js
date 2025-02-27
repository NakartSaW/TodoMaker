import axios from 'axios';

const api = axios.create({
    baseURL: 'http://todomaker.info',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
