const express = require("express")
const User = require("../models/User")

const router = express.Router()

// Get leaderboard data
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("name referralCode donationsRaised joinedDate")
      .sort({ donationsRaised: -1 })
      .limit(10)

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      referralCode: user.referralCode,
      donationsRaised: user.donationsRaised,
      joinedDate: user.joinedDate,
    }))

    res.json(leaderboard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
