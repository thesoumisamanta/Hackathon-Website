import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    
    //get user details from frontend
    const {username, email, password} = req.body
    console.log(username);


    //validation - not empty
    if(!username || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }


    //check if user already exists
    const userExists = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(userExists) {
        throw new ApiError(409, "User already exists")
    }


    //create user
    const user = await User.create({
        username,
        email,
        password
    })

    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //check for user creation
    if(!createdUser) {
        throw new ApiError(500, "Failed to create user")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User created successfully"
        )
    )
})

export {registerUser}