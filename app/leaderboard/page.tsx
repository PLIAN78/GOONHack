'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'

type LeaderboardPlayer = {
  id: number
  name: string
  company: string
  position: string
  followers: string
  engagement: number
  points: number
  image: string
  linkedinUrl: string
  rank: number
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard')
        const data = await res.json()
        setPlayers(data)
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Player Leaderboard</h1>
        <p className="text-gray-600">
          Top performers ranked by total points scored
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Followers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {player.rank <= 3 && (
                        <Trophy
                          className={`w-5 h-5 ${
                            player.rank === 1
                              ? 'text-yellow-500'
                              : player.rank === 2
                              ? 'text-gray-400'
                              : 'text-orange-600'
                          }`}
                        />
                      )}
                      <span className="font-bold text-lg">{player.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-semibold text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-600">{player.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-lg">{player.points}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-700">{player.engagement}/10</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-600">{player.followers}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
