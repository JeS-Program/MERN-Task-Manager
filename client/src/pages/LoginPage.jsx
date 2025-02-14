import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

    //Importaciones del contexto
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, errors: signinErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        signIn(data);        
    })

    useEffect(() => {  
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    signinErrors.map((error, index) => (
                        <div className='bg-red-500 text-white p-2 rounded-md my-2' key={index}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-3xl font-bold my-2'>Inicio de sesión</h1>

                <form onSubmit={onSubmit}>

                    <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo' />

                    {errors.email && (<p className='text-red-500'>El correo es requerido</p>)}

                    <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />

                    {errors.password && (<p className='text-red-500'>La contraseña es requerida</p>)}

                    <button type='submit' className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Iniciar sesión</button>

                </form>

                <p className='flex gap-x-2 justify-between'>
                    ¿No tienes una cuenta aún? <Link to='/register' className='text-blue-500'>Regístrate</Link>
                </p>


            </div>


        </div>
    );
}

export default LoginPage;