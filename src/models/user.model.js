import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //Quita los espacoios que el usuario añada por error (o sabotaje)
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true //Permite almacenar fecha de creación y de actualización
})

export default mongoose.model("User", userSchema);