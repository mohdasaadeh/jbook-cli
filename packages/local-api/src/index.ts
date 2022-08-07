import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export default (
  port: number,
  filename: string,
  dir: string,
  isProxy: boolean
) => {
  const app = express();

  if (isProxy) {
    const jbook = require.resolve("jbook/build/index.html");

    app.use(express.static(path.dirname(jbook)));
  } else {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  }

  return new Promise((resolve, reject): void => {
    app
      .listen(port, () => resolve(""))
      .on("error", (error: NodeJS.ErrnoException) => {
        if (error.code === "EADDRINUSE")
          reject(
            `Port ${port} is used by another app, please use another one.`
          );

        reject(error.message);
      });
  });
};
