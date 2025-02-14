import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        
        //Validación de correo ya utilizado
        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json(["El correo ya está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10); //Permite encriptar la contraseña
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });


        res.cookie('token', token);
        res.json({ message: "Usuario creado" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json(["Error al crear el usuario"]);
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

        const match = await bcrypt.compare(password, userFound.password); //Permite comparar la contraseña encriptada
        if (!match) return res.status(400).json(["Contraseña incorrecta"]);


        const token = await createAccessToken({ id: userFound._id });


        res.cookie('token', token);
        res.json({ id: userFound._id, username: userFound.username, email: userFound.email });

    } catch (error) {
        console.log(error.message);
        res.status(500).json(["Error al loguear"]);
    }

};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0) //Reseteando el token
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userFound = awaitUser.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
    
    
    res.json({
        username: userFound.username,
        email: userFound.email
    });

    res.send("Profile");

}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: "No autorizado"});

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({message: "No autorizado"});
    
        return res.json({id: userFound._id, username: userFound.username, email: userFound.email});
    })
}
