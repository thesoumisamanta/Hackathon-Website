import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 16,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 4,
        maxlength: 16
    },
    role: {
        type: String,
        default: "participant",
        enum: ["participant", "developer"],
    },
    refreshToken: {
        type: String
    }
}, { timesptamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcryptjs.compare(password, this.password)
    return isMatch
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            _id: this._id ,
            email: this.email,
            username: this.username
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
             _id: this._id 
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

export const User = mongoose.model("User", userSchema)
