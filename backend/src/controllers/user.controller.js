import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave: false
        })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Failed to generate access and refresh tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {

    //get user details from frontend
    const { username, email, password, role } = req.body


    //validation - not empty
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }


    //check if user already exists
    const userExists = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (userExists) {
        throw new ApiError(409, "User already exists")
    }


    //create user
    const user = await User.create({
        username,
        email,
        password,
        role: role || "participant" 
    })

    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Failed to create user")
    }

    //generate access tokens
    const accessToken = await generateAccessAndRefreshTokens(user._id)

    //return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            accessToken,
            "User created successfully"
        )
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )
})


const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
            new: true
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))

})


const refreshAccessToken = asyncHandler(async (req, res) => {

    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if (!incomingRefreshToken) {
            throw new ApiError(400, "Refresh token is required")
        }
    
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(404, "Invalid refresh token")
        }
    
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Refresh token is expired")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed successfully"))
    } catch (error) {
        throw new ApiError(401, error?.message || "Failed to refresh access token")
    }

})


const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Current password and new password are required")
    }

    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.comparePassword(currentPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Current password is incorrect")
    }

    user.password = newPassword
    await user.save({
        validateBeforeSave: false
    })

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))

})


const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"))
})


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body

    if(!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"))
})


export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails }