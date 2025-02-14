import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({message: "No has iniciado sesión, no autorizado."});

jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({message: "Token inválido"});
    req.user = user; //Al guardarlo acá, las demás funciones que reciben request tendrán acceso a los datos del usuario.
    next();//Continuar con la ejecución
}
)

}