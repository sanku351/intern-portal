"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { user, logout, token } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDashboardData(response.data)
    } catch (error) {
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const addDummyDonation = async () => {
    try {
      const amount = Math.floor(Math.random() * 200) + 50
      const response = await axios.post(
        "/api/dashboard/update-donations",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setDashboardData((prev) => ({
        ...prev,
        donationsRaised: response.data.donationsRaised,
        rewards: response.data.rewards,
      }))
    } catch (error) {
      console.error("Failed to add donation:", error)
    }
  }

  if (loading) return <div className="loading">Loading dashboard...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Intern Portal Dashboard</h1>
        <nav className="dashboard-nav">
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </nav>
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {dashboardData?.name || user?.name}! 👋</h2>
          <p>Here's your fundraising progress</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Your Referral Code</h3>
            <div className="referral-code">{dashboardData?.referralCode}</div>
            <p>Share this code to get referrals!</p>
          </div>

          <div className="stat-card">
            <h3>Total Donations Raised</h3>
            <div className="donation-amount">${dashboardData?.donationsRaised?.toLocaleString()}</div>
            <button onClick={addDummyDonation} className="add-donation-btn">
              + Add Demo Donation
            </button>
          </div>

          <div className="stat-card">
            <h3>Member Since</h3>
            <div className="join-date">{new Date(dashboardData?.joinedDate).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="rewards-section">
          <h3>🏆 Rewards & Achievements</h3>
          <div className="rewards-grid">
            {dashboardData?.rewards?.map((reward, index) => (
              <div key={index} className={`reward-card ${reward.unlocked ? "unlocked" : "locked"}`}>
                <div className="reward-icon">{reward.unlocked ? "🏆" : "🔒"}</div>
                <h4>{reward.name}</h4>
                <p>{reward.description}</p>
                <div className="reward-requirement">Required: ${reward.requiredAmount?.toLocaleString()}</div>
                {reward.unlocked && <div className="unlocked-badge">UNLOCKED!</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <h3>📈 Your Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min((dashboardData?.donationsRaised / 2500) * 100, 100)}%` }}
            ></div>
          </div>
          <p>Progress towards Platinum Badge (${dashboardData?.donationsRaised?.toLocaleString()} / $2,500)</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
