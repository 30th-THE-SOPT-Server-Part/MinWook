import { MovieInfo } from "./MovieInfo";
import { MovieResponseDto } from "./MovieResponseDto";

export interface MoviesResponseDto{
    movies: MovieInfo[];
    lastPage: number;
}