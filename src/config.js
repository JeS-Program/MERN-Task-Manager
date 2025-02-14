import {config} from "dotenv";

config(); //Carga las variables de entorno

export const TOKEN_SECRET = 'some secret key';
export const DB_URL = process.env.DB_URL;

