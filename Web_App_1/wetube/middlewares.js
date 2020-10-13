import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // configuration for multer & the files will be stored at "videos"

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// Only one file will be able to uploaded at a time because of "single" command
export const uploadVideo = multerVideo.single("videoFile");
