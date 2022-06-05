import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieCommentInfo, MovieInfo } from "../interfaces/movie/MovieInfo";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import Movie from "../models/Movie";

const createMovie = async (movieCreateDto: MovieCreateDto):Promise<PostBaseResponseDto> =>{

    try {
        const movie = new Movie(movieCreateDto);

        await movie.save();

        const data = {
            _id: movie._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;

    }

}

const createMovieComment = async(movieId: string, movieCommentCreateDto: MovieCommentCreateDto): Promise<MovieInfo | null> =>{
    try {
        const movie = await Movie.findById(movieId);
        if(!movie) return null;
        const newComments: MovieCommentInfo[] = [...movie.comments, movieCommentCreateDto];

        const updateMovie = await Movie.findOneAndUpdate({_id: movieId}, {comments: newComments}, {new: true});
        
        if(!updateMovie) return null;

        return updateMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMovie = async (movieId: string): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate('comments.writer', 'name');
        if(!movie) return null;

        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateMovieComment = async (movieId: string, commentId: string, userId: string, movieCommentUpdateDto: MovieCommentCreateDto): Promise<MovieInfo | null> =>{
    try {
        const movie = await Movie.findById(movieId);
        if(!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {_id: movieId, comments: { $elemMatch: {_id: commentId, writer: userId}}},
            {
                $set:{
                    'comments.$.writer': userId,
                    'comments.$.comment': movieCommentUpdateDto.comment,
                }
            }, {new: true});

            return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getMovieBySearch = async(search: string, option: MovieOptionType, page: number): Promise<MovieResponseDto[]> =>{
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

    let movies: MovieInfo[] = [];
    const perPage: number = 2;


    try {
        const titleRegex: RegExp = regex(search);

        if(option === 'title'){
            movies = await Movie.find({title: {$regex: titleRegex}})
                        .sort({createdAt: -1})
                        .skip(perPage * (page -1))
                        .limit(perPage);
        }else if(option === 'director'){
            movies = await Movie.find({title: {$regex: titleRegex}})
                        .sort({createdAt: -1})
                        .skip(perPage * (page -1))
                        .limit(perPage);
        }else{
            movies = await Movie.find({
                $or: [
                    {director: { $regex: titleRegex}},
                    {title: {$regex: titleRegex}}
                ]
            })
            .sort({createdAt: -1})
            .skip(perPage * (page -1))
            .limit(perPage);
        }

        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total/perPage);

        return movies;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default{
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment,
    getMovieBySearch
}