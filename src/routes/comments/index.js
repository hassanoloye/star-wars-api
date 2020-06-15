import Router from "express"

import CommentController from "../../controllers/comment"
import validateRequest from "../../services/request-validator";

const schemas = {
  commentCreate: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        minLength: 2,
        maxLength: 500
      },
      filmId: {
        type: 'integer',
        min: 1
      },
    },
    required: [
      'text',
      'filmId'
    ],
    additionalProperties: false,
  }
}
const routes = Router()

routes.get("/", CommentController.find)
routes.post("/", validateRequest(schemas.commentCreate), CommentController.create)

export default routes;
