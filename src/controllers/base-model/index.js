import {comment} from '../../../db/models'

export default class BaseModelController {
  constructor() {
    this.model = null
  }

  find  = async(req, res, next) => {
    const {where, limit, offset} = BaseModelController.getModelQueryFromRequest(req);

    try {
      const results = await this.model.findAll({where, limit, offset})
      const count = await this.model.count({where});

      return res.json({
        results,
        count
      })
    } catch (e) {
      next(e)
    }
  }

  create = async (req, res, next) => {
    try {
      const record = await this.model.create(req.body);
      return res.status(201).json(record);
    } catch (e) {
      next(e)
    }
  }

  static getModelQueryFromRequest(req) {
    const query = {
      limit: 10,
      offset: 0,
      where: {},
      options: {}
    }

    if (req.query.$limit) {
      query.limit = parseInt(req.query.$limit)
    }

    if (req.query.$offset) {
      query.offset = parseInt(req.query.$offset)
    }

    for (const [queryKey, queryValue] of Object.entries(req.query)) {
      if (!queryKey.startsWith('$')) {
        query.where[queryKey] = queryValue
      }
    }

    return query
  }

}
