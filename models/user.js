import mongoose from "mongoose";

// schemas 
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    createdAt: { type: Date, required: true }
});


const User = mongoose.model("User", userSchema);


export default User;