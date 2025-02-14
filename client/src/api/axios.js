import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', //Esto permite que todas las peticiones que se hagan a la API tengan esta URL
    withCredentials: true //Esto permite que se envíen las cookies al servidor
})

export default instance;