const express = require("express");
const nunjucks = require("nunjucks");

const routes = require("./routes");

const server = express();

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(3333);
