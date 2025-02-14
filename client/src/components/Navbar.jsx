import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function Navbar() {

    //Imports de React
    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();

    return (

        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={
                isAuthenticated ? "/tasks" : "/" //Si el usuario está autenticado, lo envía a las tareas, sino, lo envía a HomePage
            }>
                <h1 className="text-2xl font-nold">Tasks Manager</h1>
            </Link>
            <ul className="flex gap-x-2">

                {isAuthenticated ? ( //Si está autenticado, muestra esto

                    <>
                        <li>
                            ¡Bienvenido, {user.username}!
                        </li>
                        <li>
                            <Link to='/add-task' className="bg-indigo-500 px-4 py-1 rounded-sm">Nueva tarea</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>

                ) : ( //Si el usuario no está autenticado, muestra esto


                    //Dentro de <> y </> se puede ejecutar código             

                    <>
                        {location.pathname == "/" ? // Si se encuentra en HomePage, muestra registrar e iniciar sesión
                            (
                                <>
                                    <li>
                                        <Link to='/register' className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarse</Link>
                                    </li>

                                    <li>
                                        <Link to='/login' className="bg-indigo-500 px-4 py-1 rounded-sm">Iniciar sesión</Link>
                                    </li>
                                </>
                            ) : (

                                location.pathname == "/login" ? //Si
                                    (
                                        <li>
                                            <Link to='/register' className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarse</Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link to='/login' className="bg-indigo-500 px-4 py-1 rounded-sm">Iniciar sesión</Link>
                                        </li>
                                    )

                            )
                        }
                    </>


                )
                }

            </ul >
        </nav >
    )
}

export default Navbar