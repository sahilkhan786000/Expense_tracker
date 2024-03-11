import express  from "express";
import {body} from 'express-validator';
import { addUser , loginUser, addTransactions, getTransactions, deleteTransactions, summaryTransactions, deleteAllTransactions } from "../controller/control.js";

const routes = express.Router();
// const id = "ObjectId('65ed9e20abe747bf0c3fdf6c')";
routes.post('/save', addTransactions);
routes.get('/transactions', getTransactions);
routes.delete('/delete', deleteTransactions);
routes.delete('/deleteAll', deleteAllTransactions);
routes.get('/summary', summaryTransactions);

routes.post('/createuser', [
    body("firstname").isLength({ min: 5 }),
    body("lastname").isLength({ min: 2 }),
    body("phone", "Incorrect Phone number").isLength({ min: 10 }),
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    body("city").isLength({ min: 2 }),
  ], addUser);


routes.post('/loginuser', [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ], loginUser);

export default routes;
