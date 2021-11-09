const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/search", {
      // For GeoNetwork proxy
      target: "http://localhost:8080",
      pathRewrite: {
        "^/search/gn-records/": "/geonetwork/srv/api/search/records/",
      },
      // For direct Elasticsearch access
      // target: "http://localhost:9200/",
      // pathRewrite: { "^/search": "" },
      // logLevel: 'debug'
    })
  );
};
