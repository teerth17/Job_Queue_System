require('dotenv').config();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User} = require("../models/db");
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = zod.object({
    email: zod.string(),
    password:zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),

})

const SignUp= async (req,res) => {
    const body = req.body;
    console.log(body);
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            message: "Email already taken/ incorrect inputs",
        })
    }

    const user = await User.findOne({
        email: body.email,
    })
    
    console.log(body.email);
    if(user){
        return res.json({
            message: "Email Already taken",
        })
    }

    const hashPassword = await bcrypt.hash(body.password,10);

    const dbUser = await User.create({
        email:body.email,
        password:hashPassword,
        firstName:body.firstName,
        lastName:body.lastName
    });
    const userId = dbUser._id;
    console.log(userId);

    const token = jwt.sign({
        userId,
    },JWT_SECRET)
    console.log(token)
    res.json({
        userId: userId,
        message: "User created successfully",
        token: token,
    })
}

const SignIn = async (req,res) => {
    const body = req.body;
    const user = await User.findOne({
        email:body.username,
    })

     if(!user){
        res.status(400).json({
            message: "User email not registered..",
        })
        return;
    }

    const isPasswordValid = await bcrypt.compare(body.password,user.password); 
    if(!isPasswordValid){
        res.status(401).json({
            message: "Invalid Password..",
        })
        return;
    }
    const token = jwt.sign({
        userId:user._id
    },JWT_SECRET)
    res.json({
        userId: user._id,
        message: "User signed in successfully",
        token: token,
    })
}

module.exports = {SignIn,SignUp}