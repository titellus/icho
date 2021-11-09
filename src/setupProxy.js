const proxy = require("http-proxy-middleware");
const { REACT_APP_ENV } = process.env;

module.exports = function (app) {
  if (REACT_APP_ENV){
    app.use(
      proxy("/search", {
        //For direct Elasticsearch access
        target: "http://localhost:9200/",
        pathRewrite: { "^/search": "" },
        logLevel: 'debug'
      })
    );
  } else {
    app.use(
      proxy("/search", {
        // For GeoNetwork proxy
        target: "http://localhost:8080",
        pathRewrite: {
          "^/search/gn-records/": "/geonetwork/srv/api/search/records/",
        },
      })
    );
  }
};
