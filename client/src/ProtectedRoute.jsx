import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute(){

const {loading, isAuthenticated} = useAuth();
if (loading) return <h1> Cargando... </h1>

if (!loading && !isAuthenticated) return <Navigate to="/login" />; // Si no está autenticado, redirige a la página de login

    return (
        <Outlet/> // Esto hace que el usuario continúe a la ruta a la que iba, una vez autenticado
    );
}

export default ProtectedRoute;