import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id //Va a mostrar las tareas del usuario que está logueado
        }).populate('user'); //Esto hace que muestre los datos del usuario que creó la tarea (es como una especie de joint de SQL)

        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar todas las tareas" });
    }

};
export const createTasks = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear tarea" });
    }

};
export const getTask = async (req, res) => {
    console.log("Ejecutando get task");

    try {
        const task = await Task.findById(req.params.id).populate("user"); //req.params.id es el id que se envia por la url
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task); //Sino, muestra la tarea

    } catch (error) {
        return res.status(404).json({ message: "Error al buscar la tarea" })
    }

};
export const deleteTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id); //req.params.id es el id que se envia por la url
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.sendStatus(204); //Sino del if
    } catch (error) {
        return res.status(404).json({ message: "Error al eliminar la tarea" })

    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); //el parámetro new: true es para que devuelva la tarea ya modificada, no la anterior
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task); //Sino, muestra la tarea modificada
    } catch (error) {
        return res.status(404).json({ message: "Error al actualizar la tarea" })

    }
};