import moongoose from 'mongoose';

export interface UserInput{
    name: string;
    email: string;
    password: string;
    rol: "superadmin" | "regular";
}

export interface UserDocument extends UserInput, moongoose.Document {
    createdAt: Date;
    updateAt: Date;
    deleteAt: Date;
}

const userSchema = new moongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, enum: ["superadmin", "regular"], default: "regular"},
}, {timestamps: true, collection: "users"})

const User = moongoose.model<UserDocument>("User", userSchema);

export default User;