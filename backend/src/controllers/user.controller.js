import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


// register user
const registerUser = async( req,res ) => {
    try {
        const { username, email, password } = req.body;
        // basic validation
        if(!username|| !email || !password){
            return res.status(400).json({message:"all fields are important!"});
        }

        // check if user exits already
        const existing = await User.findOne({ email:email.toLowerCase()});
        if(existing){
            return res.status(400).json({message:"user already exists!"});
        }

        // // use brcypt to encrypt the password
        // const hashedPassword = await bcrypt.hash(password,10);

        // create user
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn:false
        });
        res.status(201).json({
            message:"User registered",
            user:{id:user._id,email:user.email,username:user.username}
        })
    } catch (error) {
        console.log("REGISTER ERROR::",error);
        res.status(500).json({message:"Internal server error",error:error})
    }
}

// login user
const loginUser = async( req, res ) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message:"email and password are required!"});
        }
        // find user
        const user = await User.findOne({email:email.toLowerCase()});
        
        if(!user){
            return res.status(400).json({message:"User dose not exist!"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect password"
            })
        }
        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })

    } catch (error) {
        res.status(500).json({message:"Internal server error!",error:error})
    }
}

// loginOut user
const logoutUser = async( req, res ) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message:"User doesn't exist!"
        });
        
        res.status(200).json({
            message:"Logout Successful"
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error
        })
    }
}


export{
    registerUser,
    loginUser,
    logoutUser
}