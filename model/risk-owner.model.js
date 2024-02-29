const mongoose = require('mongoose');

const roles = [
    "owner"
]

const newRiskOwner = new mongoose.Schema({
    object: {
        type: String,
        default: 'risk_owner'
    },
    fullname: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Provide a title']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "is invalid"],
        trim: true,
    },
    role: {
        type: String,
        required: [true, "Provide the role"],
        enum: {
            values: roles,
            message: "The role can only be OWNER."
        },
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

const RiskOwner = mongoose.model("RiskOwner", newRiskOwner);
module.exports = RiskOwner;