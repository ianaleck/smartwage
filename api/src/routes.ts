import express from "express";
import { connectAccount } from "./controllers/ConnectAccountController";
import {
  getQuestion,
  getQuestions,
  saveQuestion,
} from "./controllers/QuestionsController";

import { getUser, getUsers } from "./controllers/UsersController";
import receiveMessages from "./controllers/WebHookController";
import testConnection from "./middleware/testConnection";
import verifySID from "./middleware/verifySID";
const routes = express.Router();

//Auth Routes
routes.route("/connect").post(testConnection, connectAccount);
routes.route("/webhook").post(receiveMessages);

routes.route("/users").get(verifySID, getUsers);
routes.route("/users/:id").get(verifySID, getUser);

routes
  .route("/questions")
  .post(verifySID, saveQuestion)
  .get(verifySID, getQuestions);
routes.route("/questions/:id").get(verifySID, getQuestion);
// routes.route("/auth/signup").post(signUp);

// //Packages Routes
// routes
//   .route("/packages")
//   .get(tokenVerify, getPackages)
//   .post(tokenVerify, createPackage);
// routes
//   .route("/package/:pid")
//   .get(tokenVerify, getPackage)
//   .put(tokenVerify, updatePackage)
//   .delete(tokenVerify, removePackage);
export default routes;
