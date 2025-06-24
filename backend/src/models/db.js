const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,required: true,unique:true},
    password: {type:String,required:true},
    role:{type:String,enum:['user','admin'],default:'user'},
},{timestamps:true});

const jobSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    type:{type:String,require:true},
    payload: {type: mongoose.Schema.Types.Mixed, required:true},
    status:{type:String, enum:['pending','active','completed','failed'],default:'pending'},
    jobQueueId: {type:String},
    attempts: {type:Number,default:0},
    errorMessage: {type:String},
},{timestamps:true})

const User = mongoose.model('User',userSchema);
const Job = mongoose.model('Job',jobSchema);
console.log("Schema added:");

module.exports = {User,Job};