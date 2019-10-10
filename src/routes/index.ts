import about from "./about";
import user from "../services/user";
import express from "express";

export default (app: express.Application) => {
  app.route("/about").get(about);
  app.route("/user/:uid").get(user.get);
  app.route("/user/:uid").put(user.create);
  app.route("/user/:uid").delete(user.delete);
  app.route("/user/:uid").patch(user.update);
  app.route("/user/locate").post(user.locate);
};
