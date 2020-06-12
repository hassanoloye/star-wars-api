import Router from "express"
import MovieController from "../../controllers/films"


const routes = Router()

routes.get("/", MovieController.getAll)

export default routes;
