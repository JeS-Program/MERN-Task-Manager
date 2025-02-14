import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

//Este token permite al servidor saber que el usuaruo está logueado
export function createAccessToken(payload) {
   return new Promise((resolve, reject) => {

    jwt.sign(
        payload, TOKEN_SECRET,
        {
            expiresIn: "1d" //La sesión expira en 1 día.
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        }
    );

   })

}

