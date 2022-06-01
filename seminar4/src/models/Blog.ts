import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login:{
        id:{ type: String },
        password: { type: String } 
    },
    write: {
        title: { type: String },
        content: { type: String }
    }
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema)