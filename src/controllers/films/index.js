import { StarWarsService } from "../../services"

export default class MovieController {

  static async getAll(req, res) {
    const response = await StarWarsService.getFilms()
    return res.json(response)
  }
}
