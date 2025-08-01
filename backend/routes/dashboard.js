const express = require("express")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user dashboard data
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      name: user.name,
      referralCode: user.referralCode,
      donationsRaised: user.donationsRaised,
      rewards: user.rewards,
      joinedDate: user.joinedDate,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update donations (for demo purposes)
router.post("/update-donations", auth, async (req, res) => {
  try {
    const { amount } = req.body
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.donationsRaised += amount

    // Update rewards based on new amount
    user.rewards = user.rewards.map((reward) => ({
      ...reward,
      unlocked: user.donationsRaised >= reward.requiredAmount,
    }))

    await user.save()

    res.json({
      donationsRaised: user.donationsRaised,
      rewards: user.rewards,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
