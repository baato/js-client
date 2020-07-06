module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist/js", // or path: path.join(__dirname, "dist/js"),
    filename: "bundle.js",
    library: "Baato",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
};
