import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const hackathonSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        index: true,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    prizeAmount: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    maxParticipants: {
        type: Number,
        default: 5
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

hackathonSchema.plugin(mongooseAggregatePaginate)

export const Hackathon = mongoose.model("Hackathon", hackathonSchema)
