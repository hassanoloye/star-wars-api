import Ajv from 'ajv';
import createError from 'http-errors';
import {methodTypes} from "./request"

const ajv = new Ajv();

export default function validateRequest(schema) {
  return function (req, res, next) {
    const data = (req.method.toLowerCase() === methodTypes.GET || req.method === methodTypes.DELETE) ? req.query : req.body;

    console.log(schema)
    const result = ajv.validate(schema, data);

    if (!result) {
      const { message, dataPath } = ajv.errors[0];
      const errorMessage = message && dataPath
        ? `${dataPath.replace(".", "")} ${message}`
        : 'Invalid Request';
      throw createError(400, errorMessage, ajv.errors);
    }

    next()
  }
}
