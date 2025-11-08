import { Trophy, TrendingUp, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  // Mock data - replace with real data from API
  const stats = {
    rank: 3,
    totalManagers: 12,
    wins: 8,
    losses: 4,
    points: 1247,
  }

  const upcomingMatchups = [
    { opponent: 'Tech Titans', date: '2024-01-15', time: '12:00 PM' },
    { opponent: 'Startup Stars', date: '2024-01-22', time: '12:00 PM' },
  ]

  const recentActivity = [
    { type: 'Draft', description: 'Drafted Elon Musk', time: '2 hours ago' },
    { type: 'Trade', description: 'Traded for Reid Hoffman', time: '1 day ago' },
    { type: 'Waiver', description: 'Added Sam Altman', time: '3 days ago' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold">{stats.rank}</span>
          </div>
          <p className="text-gray-600">Current Rank</p>
          <p className="text-sm text-gray-500 mt-1">out of {stats.totalManagers} teams</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold">{stats.points}</span>
          </div>
          <p className="text-gray-600">Total Points</p>
          <p className="text-sm text-green-600 mt-1">+127 this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">{stats.wins}-{stats.losses}</span>
          </div>
          <p className="text-gray-600">Win-Loss Record</p>
          <p className="text-sm text-gray-500 mt-1">66.7% win rate</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold">Week 12</span>
          </div>
          <p className="text-gray-600">Current Week</p>
          <p className="text-sm text-gray-500 mt-1">3 days remaining</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Matchups */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Matchups</h2>
          <div className="space-y-4">
            {upcomingMatchups.map((matchup, idx) => (
              <div key={idx} className="border-l-4 border-primary-600 pl-4 py-2">
                <p className="font-semibold">vs {matchup.opponent}</p>
                <p className="text-sm text-gray-600">{matchup.date} at {matchup.time}</p>
              </div>
            ))}
          </div>
          <Link
            href="/standings"
            className="text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block"
          >
            View Full Schedule →
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/draft"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Join Draft
          </Link>
          <Link
            href="/my-team"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
          >
            Manage Team
          </Link>
          <Link
            href="/standings"
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Standings
          </Link>
        </div>
      </div>
    </div>
  )
}

