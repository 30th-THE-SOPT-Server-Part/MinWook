import express, {Request, Response} from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator/check";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import MovieService from "../services/MovieService";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";

/** 
* @route POST /movie
* @desc Create Movie
* @access Public
*/
const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,message.NULL_VALUE));
    }

    const movieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(movieCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/** 
* @route POST /movie/:movieId/comment
* @desc Create Movie Comment
* @access Public
*/
const createMovieComment =  async (req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,message.NULL_VALUE));
    }

    const movieCOmmentCreateDto: MovieCommentCreateDto = req.body;
    const {movieId} = req.params;

    try {
        const data = await MovieService.createMovieComment(movieId, movieCOmmentCreateDto);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/** 
* @route GET /movie/:movieId
* @desc Get Movie By Movie Id
* @access Public
*/
const getMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    

    try {
        const data = await MovieService.getMovie(movieId);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND,message.NOT_FOUND));

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_COMMENT_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/** 
* @route PUT /movie/:movieId/comments/:commentID
* @desc update Movie Comment
* @access Public
*/
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,message.NULL_VALUE));
    }
    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const {movieId, commentId} = req.params;

    try {
        // const data = await MovieService.updateMovieComment(movieId, commentId, req.body.user.id, movieCommentUpdateDto);

        // if(!data) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}

/** 
* @route GET /movie?search=
* @desc GET Movie By Search
* @access Public
*/
const getMovieBySearch = async (req: Request, res: Response) => {
    const { search, option } = req.query;

    const isOptionType = (option: string): option is MovieOptionType =>{
        return ["title", "director", "title_director"].indexOf(option) !==-1;
    }
    if(!isOptionType(option as string)){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const page: number = Number(req.query.page || 1);

    try {
        const data = await MovieService.getMovieBySearch(search as string, option as MovieOptionType, page);

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
} 

export default{
    createMovie,
    createMovieComment,
    getMovie,
    updateMovieComment,
    getMovieBySearch
}