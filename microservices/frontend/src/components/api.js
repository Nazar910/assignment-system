import axios from 'axios';

const API_URL = 'http://localhost:5000/api'

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
    return (await instance.get('/users/profile')).data;
}

export async function getAssignments() {
    return (await instance.get('/assignments')).data;
}

export async function getAssignmentById(id) {
    return (await instance.get(`/assignments/${id}`)).data;
}

export async function createAssignment(data) {
    return (await instance.post('/assignments', data)).data;
}

export async function updateAssignmentById(id, data) {
    return (await instance.put(`/assignments/${id}`, data)).data;
}

export async function getAssignees() {
    return (await instance.get('/users')).data;
}

export async function createUser(data) {
    return (await instance.post('/users', data)).data;
}

export async function getUserById(id) {
    return (await instance.get(`/users/${id}`)).data;
}

export async function deleteUserById(id) {
    await instance.delete(`/users/${id}`);
}

export async function updateUserById(id, data) {
    return (await instance.put(`/users/${id}`, data)).data;
}
