import Link from 'next/link'
import { Trophy, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Fantasy Founders League
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Draft your dream team of LinkedIn founders and compete for glory. 
            Build your roster, track performance, and climb the leaderboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/draft"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Join Draft
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Trophy className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Compete & Win</h3>
            <p className="text-gray-600">
              Compete against other managers in weekly matchups and climb the leaderboard to become the ultimate founder scout.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Draft Founders</h3>
            <p className="text-gray-600">
              Build your team by drafting top LinkedIn founders based on their network, engagement, and influence metrics.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <TrendingUp className="w-12 h-12 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Track Performance</h3>
            <p className="text-gray-600">
              Monitor your founders' LinkedIn activity, engagement rates, and network growth to optimize your lineup.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
