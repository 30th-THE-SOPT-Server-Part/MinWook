import { Router } from "express";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post('/', MovieController.createMovie);

router.get('/:movieId', MovieController.getMovie);

export default router;