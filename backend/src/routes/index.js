const express = require('express')
const userRouter = require('./user')
// const jobRouter = require('./job')

const router = express.Router();
router.use("/user",userRouter);
// router.use('/job',jobRouter);
console.log("IN main indexj")

module.exports = router