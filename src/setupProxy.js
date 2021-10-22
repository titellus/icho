const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/search", {
      target: "http://localhost:9200/",
      pathRewrite: { "^/search": "" },
    })
  );
};
