import express from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:5173", //Esto permite que el frontend pueda hacer peticiones al backend, es decir, da acceso al puerto indicado
    credentials: true //Esto permite que el servidor pueda recibir cookies
}))
app.use(morgan('dev'));
app.use(express.json()); //Para que el servidor pueda comprender json
app.use(cookieParser()); //Para poder trabajar con cookies

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;

