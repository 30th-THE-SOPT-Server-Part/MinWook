import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true //not null 느낌
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true// 고유하다라는 뜻
    },
    age: {
        type: Number
    },
    school: {
        name: {type: String},
        major: {type: String} //mongodb의 특징 document 안에 document
    }
})

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);