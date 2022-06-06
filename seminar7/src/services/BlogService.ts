import { BlogCreateDto } from "../interfaces/blog/BlogCreateDto";
import { BlogResponseDto } from "../interfaces/blog/BlogResponseDto";
import { BlogUpdateDto } from "../interfaces/blog/BlogUpdateDto";
import Blog from "../models/Blog";
import User from "../models/User";

const createBlog = async (blogCreateDto: BlogCreateDto) => {
    try {
        const blog = new Blog({
            name: blogCreateDto.name,
            login: blogCreateDto.login,
            write: blogCreateDto.write
        });

        await blog.save();

        const data = {
            _id: blog._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

const updateBlog = async (blogId: string, blogUpdateDto: BlogUpdateDto) => {
    try {
        // const updateBlog = {
        //     name: blogUpdateDto.name,
        //     login: blogUpdateDto.login,
        //     write: blogUpdateDto.write
        // }
        await Blog.findByIdAndUpdate(blogId, blogUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findBlogById = async (blogId: string): Promise<BlogResponseDto | null> =>{
    try {
        const blog: BlogResponseDto | null = await Blog.findById(blogId);

        if(!blog){
            return null;
        }

        return blog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteBlog = async (blogId: string) => {
    try {
        await Blog.findByIdAndDelete(blogId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default{
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}