const express = require('express');
const { SignUp, SignIn } = require('../controllers/user');

const jobRouter = express.Router();


// jobRouter.post("/signup", SignUp);
// jobRouter.post("/signin", SignIn);
console.log("IN main indexj")

module.exports = jobRouter;