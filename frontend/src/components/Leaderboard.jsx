"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { logout } = useAuth()

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leaderboard")
      setLeaderboard(response.data)
    } catch (error) {
      setError("Failed to load leaderboard")
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  if (loading) return <div className="loading">Loading leaderboard...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="leaderboard-container">
      <header className="dashboard-header">
        <h1>🏆 Leaderboard</h1>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </nav>
      </header>

      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h2>Top Fundraisers</h2>
          <p>See how you rank against other interns!</p>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div>Rank</div>
            <div>Name</div>
            <div>Referral Code</div>
            <div>Amount Raised</div>
            <div>Joined</div>
          </div>

          {leaderboard.map((user) => (
            <div key={user.referralCode} className={`table-row ${user.rank <= 3 ? "top-three" : ""}`}>
              <div className="rank-cell">
                <span className="rank-icon">{getRankIcon(user.rank)}</span>
              </div>
              <div className="name-cell">{user.name}</div>
              <div className="code-cell">{user.referralCode}</div>
              <div className="amount-cell">${user.donationsRaised.toLocaleString()}</div>
              <div className="date-cell">{new Date(user.joinedDate).toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        {leaderboard.length === 0 && (
          <div className="empty-state">
            <p>No data available yet. Be the first to start fundraising!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
