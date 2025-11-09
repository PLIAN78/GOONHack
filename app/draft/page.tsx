'use client'

import { useState, useEffect } from 'react'
import { Search, Check, X } from 'lucide-react'
import FounderCard from '@/components/FounderCard'

type Founder = {
  id: number
  name: string
  company: string
  followers: string
  engagement: number
  industry?: string
  image: string
  linkedinUrl: string
  available: boolean
  position?: string
  points?: number
}

export default function DraftPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFounder, setSelectedFounder] = useState<number | null>(null)
  const [draftedFounders, setDraftedFounders] = useState<number[]>([])
  const [filter, setFilter] = useState<'all' | 'available' | 'drafted'>('all')
  const [founders, setFounders] = useState<Founder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFounders() {
      try {
        // Fetch from waiver wire for available founders
        const res = await fetch('/api/waiver-wire')
        const data = await res.json()
        // Map the data to match your Founder type
        const mappedFounders = data.map((f: any) => ({
          ...f,
          available: true,
          industry: 'Technology', // You may want to add this to your API
        }))
        setFounders(mappedFounders)
      } catch (error) {
        console.error('Failed to fetch founders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFounders()
  }, [])

  const filteredFounders = founders.filter((founder) => {
    const matchesSearch = founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
      (filter === 'available' && founder.available && !draftedFounders.includes(founder.id)) ||
      (filter === 'drafted' && draftedFounders.includes(founder.id))
    return matchesSearch && matchesFilter
  })

  const handleDraft = (founderId: number) => {
    if (!draftedFounders.includes(founderId)) {
      setDraftedFounders([...draftedFounders, founderId])
      setSelectedFounder(null)
    }
  }

  const handleRemove = (founderId: number) => {
    setDraftedFounders(draftedFounders.filter(id => id !== founderId))
  }

  const myDraftedFounders = founders.filter(f => draftedFounders.includes(f.id))

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
        <h1 className="text-4xl font-bold mb-4">Draft Founders</h1>
        <p className="text-gray-600">
          Select founders from LinkedIn to build your fantasy team. Choose wisely!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search founders by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'available' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter('drafted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'drafted' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Drafts
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Founder List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Available Founders</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredFounders.map((founder) => (
              <FounderCard
                key={founder.id}
                founder={founder}
                isDrafted={draftedFounders.includes(founder.id)}
                onDraft={() => handleDraft(founder.id)}
                onRemove={() => handleRemove(founder.id)}
                onSelect={() => setSelectedFounder(founder.id)}
                isSelected={selectedFounder === founder.id}
              />
            ))}
          </div>
        </div>

        {/* Draft Roster Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold mb-4">My Roster</h2>
            <p className="text-sm text-gray-600 mb-4">
              {myDraftedFounders.length} / 8 founders selected
            </p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {myDraftedFounders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No founders drafted yet. Start selecting!
                </p>
              ) : (
                myDraftedFounders.map((founder) => (
                  <div
                    key={founder.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{founder.name}</p>
                      <p className="text-sm text-gray-600">{founder.company}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(founder.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {myDraftedFounders.length > 0 && (
              <button className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Complete Draft
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

