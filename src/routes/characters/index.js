import Router from "express"

import CharacterController from "../../controllers/characters"
import validateRequest from "../../services/request-validator";

const schemas = {
  characterList: {
    type: 'object',
    properties: {
      gender: {
        type: 'string',
        enum: [
          'male',
          'female'
        ]
      },
      orderBy: {
        type: 'string',
        enum: [
          'name',
          '-name',
          'gender',
          '-gender',
          'height',
          '-height'
        ]
      }
    }
  }
}
const routes = Router()

routes.get("/", validateRequest(schemas.characterList), CharacterController.getAll)

export default routes;
