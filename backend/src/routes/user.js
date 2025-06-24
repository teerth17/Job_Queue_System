const express = require('express');
const { SignUp, SignIn } = require('../controllers/user');

const userRouter = express.Router();


userRouter.post("/signup", SignUp);
userRouter.post("/signin", SignIn);
console.log("IN main indexj")

module.exports = userRouter