import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //Este es el usuario que va a poder ser leído por toda la aplicación
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);

        }
    }

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }


    //Contador para eliminar los mensajes de error en 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer); //Si el componente ya no se está usando, se limpia el timer
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            //Si no hay token, no está autenticado
            if (!cookies.token) {

                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            verifyTokenRequest(cookies.token)
            try { //Si hay token, se verifica si es válido
                const res = await verifyTokenRequest(cookies.token);1

                if (!res.data) { //Si no es válido, se limpia el token
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                //Si es válido, se establece el usuario y se autentifica
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) { //Si hay un error, se limpia el token
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }
        checkLogin();
    }, []);


    return (<AuthContext.Provider value={{
        signUp, signIn, logout, loading, user, isAuthenticated, errors //Todo esto es lo que va a estar disponible para toda la aplicación, exportado para cada página
    }}>{children}</AuthContext.Provider>);
}