import { Hackathon } from "../models/hackathon.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new hackathon
export const createHackathon = asyncHandler(async (req, res) => {
    try {
        console.log("Starting hackathon creation process...");
        
        const { title, description, place, startDate, endDate, prizeAmount, maxParticipants } = req.body;

        // Log received data
        console.log("Received form data:", {
            title,
            description,
            place,
            startDate,
            endDate,
            prizeAmount,
            maxParticipants
        });

        // Check if all required fields are present
        if (!title || !description || !place || !startDate || !endDate || !prizeAmount) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if the user is authenticated
        if (!req.user?._id) {
            throw new ApiError(401, "Unauthorized");
        }

        // Check if file was uploaded
        if (!req.file) {
            throw new ApiError(400, "Image file is required");
        }

        console.log("File received:", req.file);

        // Construct absolute path to the temp file (two levels up from current file)
        const tempPath = path.join(__dirname, "..", "..", "public", "temp", req.file.filename);
        console.log("Looking for file at:", tempPath);

        // Verify file exists
        if (!fs.existsSync(tempPath)) {
            console.error("File not found at:", tempPath);
            throw new ApiError(500, "Uploaded file not found in temporary storage");
        }

        // Upload to Cloudinary
        console.log("Attempting to upload to Cloudinary...");
        const cloudinaryResult = await uploadOnCloudinary(tempPath);

        if (!cloudinaryResult?.url) {
            console.error("Cloudinary upload failed:", cloudinaryResult);
            throw new ApiError(500, "Failed to upload image to cloud storage");
        }

        console.log("Cloudinary upload successful:", cloudinaryResult.url);

        // Create hackathon document
        const hackathon = await Hackathon.create({
            image: cloudinaryResult.url,
            title,
            description,
            place,
            startDate,
            endDate,
            prizeAmount,
            maxParticipants: maxParticipants || 5,
            owner: req.user._id
        });

        console.log("Hackathon created successfully:", hackathon._id);

        return res.status(201).json(
            new ApiResponse(201, hackathon, "Hackathon created successfully")
        );

    } catch (error) {
        console.error("Error in createHackathon:", error);
        
        // Clean up temp file if it exists
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        throw error;
    }
});


// Get all hackathons with pagination
export const getHackathons = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const aggregate = Hackathon.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "participants",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $project: {
                image: 1,
                title: 1,
                description: 1,
                place: 1,
                startDate: 1,
                endDate: 1,
                prizeAmount: 1,
                maxParticipants: 1,
                participants: 1,
                ownerDetails: { $arrayElemAt: ["$owner", 0] },
            },
        },
    ]);

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    const paginatedHackathons = await Hackathon.aggregatePaginate(aggregate, options);

    res.status(200).json(new ApiResponse(200, paginatedHackathons, "Hackathons fetched successfully"));
});

// Get a single hackathon by id
export const getHackathonById = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findById(req.params.id)
        .populate("participants", "username email")
        .populate("owner", "username email");

    if (!hackathon) {
        throw new ApiError(404, "Hackathon not found");
    }

    res.status(200).json(new ApiResponse(200, hackathon, "Hackathon fetched successfully"));
});

// Update a hackathon by id (only by owner)
export const updateHackathon = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findOneAndUpdate(
        { _id: req.params.id, owner: req.user._id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!hackathon) {
        throw new ApiError(404, "Hackathon not found or you're not authorized to update it");
    }

    res.status(200).json(new ApiResponse(200, hackathon, "Hackathon updated successfully"));
});

// Delete a hackathon by id (only by owner)
export const deleteHackathon = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
    });

    if (!hackathon) {
        throw new ApiError(404, "Hackathon not found or you're not authorized to delete it");
    }

    res.status(200).json(new ApiResponse(200, null, "Hackathon deleted successfully"));
});

// Join a hackathon (for participants)
export const joinHackathon = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
        throw new ApiError(404, "Hackathon not found");
    }

    if (hackathon.participants.includes(req.user._id)) {
        throw new ApiError(400, "You're already a participant");
    }

    if (hackathon.participants.length >= hackathon.maxParticipants) {
        throw new ApiError(400, "Hackathon is full");
    }

    hackathon.participants.push(req.user._id);
    await hackathon.save();

    res.status(200).json(new ApiResponse(200, hackathon, "Successfully joined the hackathon"));
});
