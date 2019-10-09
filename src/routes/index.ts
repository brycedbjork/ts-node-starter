import about from "./about";
import express from "express";

export default (app: express.Application) => {
  app.route("/about").get(about);
};
