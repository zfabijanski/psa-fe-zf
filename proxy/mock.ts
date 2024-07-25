import * as request from "request";
import * as express from "express";
import { handleError } from "./utils";

import { products, illustrations } from "./mocks/products";
import { link, idToUrl } from "./mocks/pdf";

const server = express();

const pdfHandler: express.RequestHandler = (req, res) => {
  const uri = `${link}/${req.params[0]}`;
  const uriSegments = uri.split("/");
  const id = uriSegments.pop();
  if (idToUrl[id]) {
    uriSegments.push(idToUrl[id]);
  } else {
    uriSegments.push(id);
  }

  const newUri = uriSegments.join("/");
  console.log("PDF", newUri);
  req.pipe(request(newUri)).pipe(res);
};

const productsHandler: express.RequestHandler = (_, res) => {
  res.end(JSON.stringify({ products }));
};

const illustrationsHandler: express.RequestHandler = (_, res) => {
  res.end(JSON.stringify({ illustrations }));
};

const eappProductsHandler: express.RequestHandler = (_, res) => {
  res.end(JSON.stringify(["6401", "6402", "6403", "6404", "6107"]));
};

server.get("/psao/api/files/*", pdfHandler);
server.all("/psao/api/meetings/products?meetingId=*", productsHandler);
server.all("/psao/api/meetings?meetingId=*", illustrationsHandler);
server.all("/psao/mock_api/calc/eapp/products", eappProductsHandler);

server
  .listen(3002, () => console.log("Started mock server on port 3002"))
  .on("error", handleError);
