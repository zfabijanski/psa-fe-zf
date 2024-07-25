import * as express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const getWebpackHrProxy = (port) =>
  createProxyMiddleware("/sockjs-node", {
    target: `http://localhost:${port}`,
    ws: true,
  });

export const loggerMiddleware =
  (name: string): express.RequestHandler =>
  (req, _, next) => {
    console.log(name, req.url);
    next();
  };

export const handleError: express.ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);
  next?.();
};
