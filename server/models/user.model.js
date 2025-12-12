import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    countryCode: {
        type: String,
        required: true,
        trim: true
    },
    confidence: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["To Check", "Verified"],
        default: "To Check",
        required: true
    },
    isSynced: {
        type: Boolean, 
        default: false
    }
})

export default mongoose.model("User", userSchema);