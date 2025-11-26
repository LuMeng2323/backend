import { Post } from "../models/post.model.js";


// create a post

const createPost = async( req,res ) => {
    try {
        const {name, description, age} = req.body;
        // check missing fields and validate age type & val
        if( [name, description, age].some(field => field ===undefined || field === "")){
            if(!Number.isInteger(age) || age<=0 ){
                return res.status(400).json({
                    message:"All fields are required"
                });
            }
        }
        // creating post
        const post = await  Post.create({ name, description, age});
        res.status(201).json({
            message:"Post created successfully",post
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",error
        })
    }
}

// get all posts
const getPosts = async ( req, res ) =>{
    try {
        const posts = await Post.find();
        res.status(200).json({
            message:"Your operation was successful!",
            posts
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error
        })
    }
}

export{
    createPost,
    getPosts
}