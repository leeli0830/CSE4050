//const express = require("express"); => require means it gets a node moduel from somewhere else
import express from "express";
import morgan from "morgan"; // Logging package
import helmet from "helmet"; // Security package
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import { userRouter } from "./userRouter"; // userRouter is not exported as a default
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

const app = express(); // declares a variable and call and run express

//const handleHome = (req, res) => res.send("Hello from my ass");

//const handleProfile = (req, res) => res.send("You are on my profile");

// The following lines call middlewares.
app.use(helmet()); // Security middleware
app.set("view engine", "pug");

// "static" is one of the default middleware offered by express server
// When a user access to "/uploads" then it will access to the directory called "uploads"
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // How a server understand cookies from users
app.use(bodyParser.urlencoded({ extended: true })); // How a server understand data from users
app.use(bodyParser.json());
app.use(morgan("dev")); // Logging all the events happening on the application
app.use(localsMiddleware);

// The following codes are for "GET" function (Routes)
//app.get("/", handleHome);
//app.get("/profile", handleProfile);

// Referencing the object saved in "routes.js" file
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // When somebody access to "/user". use "userRouter"
app.use(routes.videos, videoRouter);

export default app; // This enables other files to use app & Line 15 to 23 are app configurations
