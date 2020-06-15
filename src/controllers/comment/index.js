import {comment} from '../../../db/models'
import BaseModelController from "../base-model"


class CommentController extends BaseModelController {
  constructor() {
    super();
    this.model = comment
  }

  create = async (req, res, next) => {
    const data = {
      ...req.body,
      userIpAddress: req.connection.remoteAddress
    };
    try {
      const record = await this.model.create(data);
      return res.status(201).json(record);
    } catch (e) {
      next(e)
    }
  }
}

export default new CommentController()
