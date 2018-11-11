import axios from 'axios';

const API_URL = 'http://localhost:8080/api'

const headers = {}

const instance = axios.create({
    baseURL: API_URL,
    headers
})

export async function post(url, data) {
    return instance.post(url, data);
}
