import axios from 'axios';

const API_URL = 'http://localhost:8080/api'

const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
}

const instance = axios.create({
    baseURL: API_URL,
    headers
})

export async function login(email, password) {
    const { data } = await instance.post('/users/login', {
        email,
        password
    });
    headers.Authorization = `Bearer ${data.token}`;
    return data;
}

export async function getProfile() {
    return instance.get('/users/profile');
}
