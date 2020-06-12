import {StarWarsService, validate} from "../../services"


export default class CharactersController {

  static async getAll(req, res) {
    const response = await StarWarsService.getCharacters(req.query.gender, req.query.orderBy)
    return res.json(response)
  }
}
