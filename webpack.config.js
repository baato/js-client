module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    library: "Baato",
    libraryTarget: "umd",
    libraryExport: "default"
  },
};
