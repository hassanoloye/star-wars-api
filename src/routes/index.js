import {readdirSync} from "fs";
import express from "express";
import path from "path";
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const docsPath = path.resolve(__dirname, '../../docs/spec.yaml');
const swaggerDocument = YAML.load(docsPath);

const routeDirectories = readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const routes = express.Router()
routes.get("/", function (req, res) {
  return res.sendFile(path.resolve(__dirname, '../../public/index.html'));
})
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routeDirectories.forEach((directory) => {
  const routePath = `/${directory}`
  const routeFile = require(`./${directory}`).default

  routes.use(routePath, routeFile)
})

export  default routes;
