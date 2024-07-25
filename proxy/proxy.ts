import * as request from "request";
import * as express from "express";
import * as fs from "fs";
import * as https from "https";
import { getWebpackHrProxy, handleError, loggerMiddleware } from "./utils";

const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
const certificate = fs.readFileSync("sslcert/server.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const proxy = express().use(loggerMiddleware("proxy"));

const getPipeHandler =
  (targetAddress: string): express.RequestHandler =>
  (req, res) => {
    const uri = `${targetAddress}${req.originalUrl}`;
    console.error({ uri });
    const redirect = request(
      { uri, followRedirect: false, timeout: 60000 },
      (err) => {
        if (err) {
          return console.warn("request error catched: ", err.message);
        }
      }
    );
    req.pipe(redirect).pipe(res);
  };
const mockHandler = getPipeHandler("http://localhost:3002");
const apiHandler = getPipeHandler("https://psao-dev.pre-konsultant.pl");
const psaoProdHandler = getPipeHandler("http://localhost:5003");
const psaoDevHandler = getPipeHandler("http://localhost:3000");
const proxyHandler = getPipeHandler("http://localhost:3003");

proxy.get("/reflect*", (req, res) => {
  const cookieHeader = req.headers.cookie;
  const cookieEntries =
    cookieHeader?.split("; ").map((cookieString) => cookieString.split("=")) ||
    [];

  const setCookieHeaders = cookieEntries.map(
    ([key, value]) => `${key}=${value}; Path=/; HttpOnly; SameSite=Lax`
  );
  setCookieHeaders.forEach((headerString) => {
    res.setHeader("set-cookie", headerString);
  });
  console.log({ setCookieHeaders });
  res.status(200).json(setCookieHeaders);
});

proxy.get("/psao/mock_api/*", mockHandler);
proxy.get("/psao/api/files/*", mockHandler);
proxy.all("/psao/api/*", apiHandler);
proxy.all("/drfiles/*", apiHandler);
proxy.all("/home(/?)*", apiHandler);
proxy.all("/eapp(/?)*", apiHandler);
proxy.all("/hydra(/?)*", apiHandler);
proxy.all("*", psaoDevHandler);

const reverseProxy = express().use(loggerMiddleware("reverse proxy"));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // to prevent Self-Signed Certificate error
const isProdMode = process.env.MODE === "prod";
if (isProdMode) {
  reverseProxy.all("/status/*", apiHandler);
  reverseProxy.all("/psao(/?)*", psaoProdHandler);
} else {
  proxy.use(getWebpackHrProxy(3000));
  reverseProxy.all("/status/*", apiHandler);
  reverseProxy.all("/psao(/?)*", proxyHandler);
  reverseProxy.all("/*", proxyHandler);
}

proxy
  .listen(3003, () => console.log("Started proxy on port 3003"))
  .on("error", handleError);

https
  .createServer(credentials, reverseProxy)
  .listen(5000, () => console.log("Started reverse proxy on port 5000"))
  .on("error", handleError);
