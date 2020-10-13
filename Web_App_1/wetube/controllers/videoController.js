// import { videos } from "../db"; // Deleted after MongDB is installed
import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  // "async" means this function will do waiting process
  try {
    // "await" means this home function will wait until the end of this line
    // In "_id: -1", -1 means upside down
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    // When an error occurs the following will be executed
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); // videos will be an empty array
  }
}; // "render" automatically finds "home" file from "views" folder

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = []; // we are not using "const" because we will reassign this variable
  try {
    // "regex" means regular expression
    // 'i' in the options means insensitive (case insensitive)
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) => res.render("videos");
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  // "create" automatically issues new id
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
