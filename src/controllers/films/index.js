import {StarWarsService} from "../../services"

export default class MovieController {

  static async getAll(req, res, next) {
    try {
      const response = await StarWarsService.getFilms()
      return res.json(response)
    } catch (e) {
      next(e)
    }
  }
}
