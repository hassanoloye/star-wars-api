import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import {ValidationError} from "express-validation"


import routes from "../routes";

export default function (app) {
  const config = require("config")

  app.use(cors());
  app.use(bodyParser.json({type: "application/json"}));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan("dev"));

  app.use(routes);

  app.use((err, req, res, next) => {
    console.log(err);

    let error;
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      error = err.errors[0].message.replace("must be unique", "already exist");
      res.statusMessage = error;
      return res.status(400).send({
        message: error
      });
    }

    if (/^Sequelize/.test(err.name) && config.debug) {
      error = err.message;
      res.statusMessage = error;
      return res.status(400).send({message: error});
    }

    if (/^5/.test(err.status) || !err.status) {
      if (config.debug) {
        error = err.message;
      } else {
        error = "An error occurred on our end. Please try again later";
      }
      res.statusMessage = error;
      return res.status(500).send({message: error});
    }

    res.statusMessage = err.message;
    return res.status(err.status).send({message: err.message, errors: err});
  });
}
