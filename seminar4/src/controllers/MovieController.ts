import {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import MovieService from "../services/MovieService";

/** 
 * 영화 정보 저장 API
* @route POST /movie
* @desc Create Movie
* @access Public
*/
const createMovie = async(req: Request, res: Response) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }//validation

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
 * 영화 정보 조회 API
* @route GET /movie/:movieId
* @desc Get Movie
* @access Public
*/

const getMovie = async(req: Request ,res: Response) => {
    const {movieId} = req.params;
    try {
        const data = await MovieService.getMovie(movieId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        
    }
}


export default{
    createMovie,
    getMovie,
}