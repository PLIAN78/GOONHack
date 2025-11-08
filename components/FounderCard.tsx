import { ExternalLink, TrendingUp, Users } from 'lucide-react'

interface Founder {
  id: number
  name: string
  company: string
  followers: string
  engagement: number
  industry: string
  image: string
  linkedinUrl: string
  available: boolean
}

interface FounderCardProps {
  founder: Founder
  isDrafted: boolean
  onDraft: () => void
  onRemove: () => void
  onSelect: () => void
  isSelected: boolean
}

export default function FounderCard({
  founder,
  isDrafted,
  onDraft,
  onRemove,
  onSelect,
  isSelected,
}: FounderCardProps) {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-lg border-2 transition-all cursor-pointer ${
        isSelected ? 'border-primary-600 ring-2 ring-primary-200' : 'border-transparent hover:border-gray-200'
      } ${isDrafted ? 'opacity-60' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-600">
            {founder.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg">{founder.name}</h3>
              <p className="text-sm text-gray-600">{founder.company}</p>
            </div>
            {isDrafted && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                Drafted
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{founder.followers}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{founder.engagement}/10</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {founder.industry}
            </span>
            <a
              href={founder.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {isSelected && !isDrafted && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDraft()
              }}
              className="w-full mt-3 bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              Draft Founder
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

