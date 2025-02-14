import { z } from 'zod';

export const createTaskSchema = z.object({

    title: z.string({
        required_error: "El título es requerido"
    }),
    description: z.string({
        required_error: "La descripción es requerida"
    }),
    date: z.string().datetime().optional(),

})