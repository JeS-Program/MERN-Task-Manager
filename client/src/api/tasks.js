import axios from "./axios";

export const getTasksRequest = async () => { return axios.get('/tasks'); }
export const getTaskRequest = async (id) => { return await axios.get(`/task/${id}`) }
export const createTaskRequest = async (task) => { return axios.post('/tasks', task) }
export const updateTaskRequest = async (id, task) => { axios.put(`/task/${id}`, task) }
export const deleteTaskRequest = async (id) => { return await axios.delete(`/task/${id}`) }
