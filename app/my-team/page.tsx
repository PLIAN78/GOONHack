'use client'

import { Users, TrendingUp, ExternalLink, Edit2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Founder = {
  id: number
  name: string
  company: string
  position: string
  followers: string
  engagement: number
  points: number
  image: string
  linkedinUrl: string
}

export default function MyTeamPage() {
  const router = useRouter()
  const [myTeam, setMyTeam] = useState<Founder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/my-team')
        const data = await res.json()
        setMyTeam(data)
      } catch (error) {
        console.error('Failed to fetch team:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  const totalPoints = myTeam.reduce((sum, founder) => sum + founder.points, 0)
  const avgEngagement = (myTeam.reduce((sum, founder) => sum + founder.engagement, 0) / myTeam.length).toFixed(1)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Team</h1>
          <p className="text-gray-600">
            Manage your roster and track your founders' performance
          </p>
        </div>
        <button 
          onClick={() => router.push('/draft')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Edit2 className="w-5 h-5" />
          Edit Roster
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-primary-600 mb-2">{myTeam.length}</div>
          <div className="text-gray-600">Founders</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">{totalPoints}</div>
          <div className="text-gray-600">Total Points</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">{avgEngagement}</div>
          <div className="text-gray-600">Avg Engagement</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">8/8</div>
          <div className="text-gray-600">Roster Spots</div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Active Roster</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {myTeam.map((founder, index) => (
            <div key={founder.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-gray-600">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{founder.name}</h3>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded font-semibold">
                        {founder.position}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{founder.company}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{founder.followers}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{founder.engagement}/10</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">{founder.points}</span> pts
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    title="View LinkedIn Profile"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => {
                      if (confirm(`Remove ${founder.name} from your team? You can add them back from the waiver wire.`)) {
                        // In a real app, you'd make an API call here to remove the founder
                        // For now, we'll just navigate to the waiver wire page
                        router.push('/draft')
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit or Remove Founder"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bench / Available Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Recent Performance</h3>
          <div className="space-y-3">
            {myTeam.slice(0, 3).map((founder) => (
              <div key={founder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{founder.name}</p>
                  <p className="text-sm text-gray-600">+{Math.floor(Math.random() * 30 + 10)} pts this week</p>
                </div>
                <span className="text-green-600 font-semibold">↑</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/draft')}
              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <p className="font-semibold">Add from Waiver Wire</p>
              <p className="text-sm text-gray-600">Browse available founders</p>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-semibold">Propose Trade</p>
              <p className="text-sm text-gray-600">Trade with other managers</p>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-semibold">View Matchups</p>
              <p className="text-sm text-gray-600">See upcoming games</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

