// webpack is not connected to server codes
// Old version Javascript is used here because "babel-node" cannot be used here yet

const path = require("path"); // This line is equal to "import path from "path""
const autoprefixer = require("autoprefixer");
// This is a nodejs default package that enable to use global path
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // Using "resolve" because it is a file
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  // Whenever you find a module
  module: {
    // Follow the following rules
    rules: [
      {
        test: /\.(js)$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(scss)$/, // Check if there's any scss format file
        // If the above test is passed, use this plug-in to translate a scss to a normal css
        // The operation in the following array will be excuted from the bottom to the top
        // When the css reaches to the very top inner plug-in, it will be extracted
        use: ExtractCSS.extract([
          {
            // Load the css that is passed from "postcss-loader"
            loader: "css-loader",
          },
          {
            // This will take the css that is passed from "sass-loader"
            // Then transform the css with the plug-in that you offer
            // ex) transform the css in the format that internet explorer can understand
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ overrideBrowserslist: "cover 99.5%" })];
              },
            },
          },
          {
            // This will be excuted first
            // "sass-loader" accepts Sass or Scss and translate it to a normal css
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
  devtool: "cheap-module-source-map",
};

module.exports = config;
