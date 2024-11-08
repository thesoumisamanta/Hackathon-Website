import { Hackathon } from "../models/hackathon.model.js";
import mongoose from "mongoose";


//Create a new hackathon
export const createHackathon = async (req, res) => {
    try {
        const hackathon = new Hackathon({
            ...req.body,
            owner: req.user._id
        }) 

        await hackathon.save()
        res.status(201).json(hackathon)
    } catch (error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }       
}


//Get all hackathons with pagination
export const getHackathons = async (req, res) => {
    try {
        const {page = 1, limit = 10} = req.query

        const aggregate = Hackathon.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "participants",
                    foreignField: "_id",
                    as: "participants"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner"
                }
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
                    ownerDetails: {
                        $arrayElementAt: [$ownerDetails, 0]
                    }
                }
            }
        ]),

        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        const paginatedHackathons = await Hackathon.aggregatePaginate(aggregate, options)

        res.status(200).json(paginatedHackathons)

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


//Get a single hackathon by id
export const getHackathonById = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id)
        .populate("participants", "username email")
        .populate("owner", "username email")

        if(!hackathon) {
            return res.status(404).json({message: "Hackathon not found"})
        }

        res.status(200).json(hackathon)

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//Update a Hackathon by id(only by owner)
export const updateHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findOneAndUpdate(
            {
                _id: req.params.id,
                 owner: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if(!hackathon) {
            return res.status(404).json({message: "Hackathon not found or you're not authorized update it "})
        }

        res.status(200).json(hackathon)

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


//Delete a hackathon by id(only by owner)
export const deleteHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if(!hackathon) {
            return res.status(404).json({message: "Hackathon not found or you're not authorized delete it "})
        }

        res.status(200).json({message: "Hackathon deleted successfully"})

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//Join a hackathon(for participants)
export const joinHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if(!hackathon) {
            return res.status(404).json({
                "Hackathon not found"
            })
        }

        if(hackathon.participants.includes(req.user._id)){
            return res.status(400).json({
                message: "You're already a participant"
            })
        }

        if(hackathon.participants.length >= hackathon.maxParticipants){
            return res.status(400).json({
                message: "Hackathon is full"
            })
        }

        hackathon.participants.push(req.user._id)
        await hackathon.save()

        res.status(200).json({message: "Successfully joined the hackathon", hackathon})

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}