import * as functions from "firebase-functions";
import * as proxy from "express-http-proxy";
import * as express from "express";

const app = express();

const API_URL = "https://fadev.fasolutions.com";

app.use(
  "",
  proxy(`${API_URL}/graphql`, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (proxyReqOpts.headers) {
        const body = srcReq.body;
        proxyReqOpts.headers["content-length"] = JSON.stringify(body).length;
        delete proxyReqOpts.headers["transfer-encoding"];
      }
      return proxyReqOpts;
    },
  })
);

export const graphqlProxy = functions.https.onRequest(app);
