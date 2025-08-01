const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  donationsRaised: {
    type: Number,
    default: 0,
  },
  rewards: [
    {
      name: String,
      description: String,
      unlocked: {
        type: Boolean,
        default: false,
      },
      requiredAmount: Number,
    },
  ],
  joinedDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", UserSchema)
