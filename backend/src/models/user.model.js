import mongoose,{Schema} from "mongoose";

import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            minLength: 1,
            maxLength: 10,

        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

// before we saving any password we need to hash it

userSchema.pre("save", async function () {

    // if the password hasn't been changed, then just move on to the next step.
    if(!this.isModified("password")) return;
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    } catch (error) {
        throw error;
    }
});

// add a method to  validate the password (for login)

userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword,this.password);
}

export const User = mongoose.model("User",userSchema)