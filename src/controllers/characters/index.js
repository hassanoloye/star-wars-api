import {StarWarsService, validate} from "../../services"


export default class CharactersController {

  static async getAll(req, res, next) {
    try {
      const response = await StarWarsService.getCharacters(req.query)
      return res.json(response)
    } catch (e) {
      next(e)
    }
  }
}
