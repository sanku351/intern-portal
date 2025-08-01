const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// Generate referral code
const generateReferralCode = (name) => {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "")
  return `${cleanName}2025`
}

// Default rewards
const defaultRewards = [
  {
    name: "Bronze Badge",
    description: "Raise your first $100",
    unlocked: false,
    requiredAmount: 100,
  },
  {
    name: "Silver Badge",
    description: "Raise $500 in donations",
    unlocked: false,
    requiredAmount: 500,
  },
  {
    name: "Gold Badge",
    description: "Raise $1000 in donations",
    unlocked: false,
    requiredAmount: 1000,
  },
  {
    name: "Platinum Badge",
    description: "Raise $2500 in donations",
    unlocked: false,
    requiredAmount: 2500,
  },
]

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate referral code
    const referralCode = generateReferralCode(name)

    // Create user with dummy donation amount
    const dummyDonations = Math.floor(Math.random() * 2000) + 100

    user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode,
      donationsRaised: dummyDonations,
      rewards: defaultRewards.map((reward) => ({
        ...reward,
        unlocked: dummyDonations >= reward.requiredAmount,
      })),
    })

    await user.save()

    // Create JWT token
    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", {
      expiresIn: "24h",
    })

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Create JWT token
    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", {
      expiresIn: "24h",
    })

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
