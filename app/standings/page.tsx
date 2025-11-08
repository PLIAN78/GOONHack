import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react'

// Mock standings data
const standings = [
  { rank: 1, teamName: 'Tech Titans', wins: 10, losses: 2, points: 1456, streak: 5, change: 0 },
  { rank: 2, teamName: 'Startup Stars', wins: 9, losses: 3, points: 1389, streak: 3, change: 1 },
  { rank: 3, teamName: 'My Team', wins: 8, losses: 4, points: 1247, streak: 2, change: -1 },
  { rank: 4, teamName: 'VC Legends', wins: 8, losses: 4, points: 1203, streak: 1, change: 0 },
  { rank: 5, teamName: 'Founder Force', wins: 7, losses: 5, points: 1156, streak: -2, change: 2 },
  { rank: 6, teamName: 'Innovation Inc', wins: 6, losses: 6, points: 1098, streak: -1, change: -1 },
  { rank: 7, teamName: 'Scale Squad', wins: 5, losses: 7, points: 987, streak: 1, change: 0 },
  { rank: 8, teamName: 'Growth Gurus', wins: 4, losses: 8, points: 876, streak: -3, change: 0 },
]

export default function StandingsPage() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getStreakColor = (streak: number) => {
    if (streak > 0) return 'text-green-600'
    if (streak < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">League Standings</h1>
        <p className="text-gray-600">
          Current rankings and performance metrics for all teams in the league.
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
                  Team
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Record
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Streak
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {standings.map((team) => (
                <tr
                  key={team.rank}
                  className={`hover:bg-gray-50 transition-colors ${
                    team.teamName === 'My Team' ? 'bg-primary-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {team.rank <= 3 && (
                        <Trophy
                          className={`w-5 h-5 ${
                            team.rank === 1
                              ? 'text-yellow-500'
                              : team.rank === 2
                              ? 'text-gray-400'
                              : 'text-orange-600'
                          }`}
                        />
                      )}
                      <span className="font-bold text-lg">{team.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{team.teamName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-medium">
                      {team.wins}-{team.losses}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({((team.wins / (team.wins + team.losses)) * 100).toFixed(1)}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-lg">{team.points.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`font-semibold ${getStreakColor(team.streak)}`}>
                      {team.streak > 0 ? `W${team.streak}` : team.streak < 0 ? `L${Math.abs(team.streak)}` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getChangeIcon(team.change)}
                      {team.change !== 0 && (
                        <span className={`text-sm font-medium ${
                          team.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {Math.abs(team.change)}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">League Leaders</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Points</span>
              <span className="font-semibold">{standings[0].teamName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Best Record</span>
              <span className="font-semibold">{standings[0].teamName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Longest Streak</span>
              <span className="font-semibold">W{standings[0].streak}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Season Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Week</span>
              <span className="font-semibold">Week 12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Teams</span>
              <span className="font-semibold">{standings.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Playoffs Start</span>
              <span className="font-semibold">Week 14</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Your Position</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Rank</span>
              <span className="font-semibold text-primary-600">#{standings[2].rank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Points Behind</span>
              <span className="font-semibold">
                {standings[1].points - standings[2].points}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Playoff Status</span>
              <span className="font-semibold text-green-600">In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

