import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc); //Permite convertir formatos de fechas


function TaskFormPage() {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams(); //Permite leer datos dinámicos enviados por url

    useEffect(() => {
        async function loadTask() {
            
            if (params.id) {
                const task = await getTask(params.id);
                //Esto interactúa con los elementos de la página. El primer parámetro ubica al elemento por su nombre. El segundo parámetro indica el dato a colocar
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('date', dayjs.utc(task.date).format("YYYY-MM-DD"))
            }
        }
        loadTask();
    }, [])

    //Acción al presionar el botón
    const onSubmit = handleSubmit((data) => {

        const dataValid = {
            ...data,
            //Va a tomar el parámetro "date" de todos los datos y le va a dar el formato utc. Si no hay fecha, pone la actual
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
        }

        if (params.id) { //Esto permite reutilizar la vista tanto para crear como editar
            //Si existe el id, ejecuta esto
            updateTask(params.id, dataValid
            );
        } else { //Si no existe el id, ejecuta esto
            createTask(dataValid);
        }
        navigate('/tasks');
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

                <form onSubmit={onSubmit}>

                    <label htmlFor="title">Título</label>
                    <input type="text" placeholder="Título"
                        {...register("title", { required: true, maxLength: 80 })} autoFocus className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

                    <label htmlFor="description">Descripción</label>
                    <textarea rows="3" placeholder="Descripción"
                        {...register("description", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"></textarea>

                    <label htmlFor="date">Fecha</label>
                    <input type="date" {...register('date')} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

                    <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>

                </form>

            </div>
        </div>
    );
}

export default TaskFormPage;