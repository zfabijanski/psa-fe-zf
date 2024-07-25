import * as express from "express";
import * as path from "path";
import * as request from "request";
import { handleError } from "./utils";

const directory = "build";
const port = 5003;
const proxyAddress = "http://localhost:3003";

const server = express();

const proxyHandler: express.RequestHandler = (req, res) => {
  req.pipe(request(`${proxyAddress}${req.originalUrl}`)).pipe(res);
};

server.use("/psao", express.static(directory));
server.all("/psao/api/*", proxyHandler);
server.all("/drfiles/*", proxyHandler);

const anyHandler: express.RequestHandler = (req, res) => {
  res.sendFile(path.resolve(__dirname, `../${directory}/index.html`));
};

server.get("/*", anyHandler);

server
  .listen(port, () => console.log(`Started app server on port ${port}`))
  .on("error", handleError);
