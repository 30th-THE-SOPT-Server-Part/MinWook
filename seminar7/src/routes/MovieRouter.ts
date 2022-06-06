import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { body } from "express-validator/check";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()
], MovieController.createMovie);

router.get('/', MovieController.getMoviesBySearch);

router.post('/:movieId/comment',[
    body('writer').notEmpty(),
    body('comment').notEmpty()
],MovieController.createMovieComment)

router.get('/:movieId', MovieController.getMovie);

export default router;