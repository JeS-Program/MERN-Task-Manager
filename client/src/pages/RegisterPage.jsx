import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth(); //Importando desde el contexto
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signUp(values);
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    RegisterErrors.map((error, index) => (
                        <div className='bg-red-500 text-white p-2 rounded-md ' key={index}>
                            {error}
                        </div>
                    ))
                }
                 <h1 className='text-3xl font-bold my-2'>Registro</h1>
                <form onSubmit={onSubmit}>
               
                    <input type="text"
                        {...register("username", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre de usuario' />

                    {errors.username && (<p className='text-red-500'>El nombre de usuario es requerido</p>)}

                    <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo' />

                    {errors.email && (<p className='text-red-500'>El correo es requerido</p>)}

                    <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />

                    {errors.password && (<p className='text-red-500'>La contraseña es requerida</p>)}

                    <button type='submit' className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Registrar</button>

                </form>

                <p className='flex gap-x-2 justify-between'>
                    ¿Ya tienes una cuenta? <Link to='/login' className='text-blue-500'>Inicia sesión</Link>
                </p>

            </div></div>
    );
}

export default RegisterPage;