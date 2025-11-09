'use client'

import React, { useState } from 'react';
import { Trophy, TrendingUp, MessageSquare, Users, DollarSign, Award, ArrowRight } from 'lucide-react';

type Founder = {
  id: number;
  name: string;
  company: string;
  position: string;
  followers: string;
  engagement: number;
  points: number;
  image: string;
};

type Activity = {
  id: string;
  founderId: number;
  founderName: string;
  type: 'post' | 'comment' | 'funding' | 'media' | 'milestone';
  description: string;
  points: number;
  timestamp: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
};

type MatchResult = {
  playerTeamScore: number;
  opponentTeamScore: number;
  winner: 'player' | 'opponent' | 'tie';
  activities: Activity[];
  founderStats: {
    founderId: number;
    totalPoints: number;
    activities: number;
    topPerformance: string;
  }[];
};

const SAMPLE_FOUNDERS: Founder[] = [
  { id: 1, name: "Elon Musk", company: "Tesla, SpaceX", position: "QB", followers: "150M", engagement: 8.5, points: 0, image: "https://via.placeholder.com/80" },
  { id: 2, name: "Reid Hoffman", company: "LinkedIn, Greylock", position: "RB", followers: "2.5M", engagement: 9.2, points: 0, image: "https://via.placeholder.com/80" },
  { id: 3, name: "Sam Altman", company: "OpenAI", position: "WR", followers: "1.8M", engagement: 9.8, points: 0, image: "https://via.placeholder.com/80" },
  { id: 4, name: "Drew Houston", company: "Dropbox", position: "TE", followers: "850K", engagement: 8.1, points: 0, image: "https://via.placeholder.com/80" },
  { id: 5, name: "Jensen Huang", company: "NVIDIA", position: "K", followers: "2.1M", engagement: 9.5, points: 0, image: "https://via.placeholder.com/80" },
  { id: 6, name: "Brian Chesky", company: "Airbnb", position: "RB", followers: "1.2M", engagement: 8.7, points: 0, image: "https://via.placeholder.com/80" },
  { id: 7, name: "Whitney Wolfe Herd", company: "Bumble", position: "WR", followers: "900K", engagement: 9.1, points: 0, image: "https://via.placeholder.com/80" },
  { id: 8, name: "Satya Nadella", company: "Microsoft", position: "QB", followers: "11M", engagement: 9.3, points: 0, image: "https://via.placeholder.com/80" },
  { id: 9, name: "Daniel Ek", company: "Spotify", position: "WR", followers: "650K", engagement: 8.4, points: 0, image: "https://via.placeholder.com/80" },
  { id: 10, name: "Melanie Perkins", company: "Canva", position: "RB", followers: "580K", engagement: 8.9, points: 0, image: "https://via.placeholder.com/80" },
  { id: 11, name: "Patrick Collison", company: "Stripe", position: "TE", followers: "720K", engagement: 9.0, points: 0, image: "https://via.placeholder.com/80" },
  { id: 12, name: "Anne Wojcicki", company: "23andMe", position: "K", followers: "420K", engagement: 7.8, points: 0, image: "https://via.placeholder.com/80" },
  { id: 13, name: "Tony Xu", company: "DoorDash", position: "RB", followers: "380K", engagement: 8.2, points: 0, image: "https://via.placeholder.com/80" },
  { id: 14, name: "Dara Khosrowshahi", company: "Uber", position: "QB", followers: "1.5M", engagement: 8.6, points: 0, image: "https://via.placeholder.com/80" },
  { id: 15, name: "Marc Benioff", company: "Salesforce", position: "TE", followers: "2.8M", engagement: 9.4, points: 0, image: "https://via.placeholder.com/80" },
  { id: 16, name: "Stewart Butterfield", company: "Slack", position: "K", followers: "540K", engagement: 7.9, points: 0, image: "https://via.placeholder.com/80" },
  { id: 17, name: "Susan Wojcicki", company: "YouTube", position: "QB", followers: "1.1M", engagement: 8.3, points: 0, image: "https://via.placeholder.com/80" },
  { id: 18, name: "Travis Kalanick", company: "CloudKitchens", position: "RB", followers: "890K", engagement: 7.6, points: 0, image: "https://via.placeholder.com/80" },
  { id: 19, name: "Logan Green", company: "Lyft", position: "WR", followers: "460K", engagement: 8.0, points: 0, image: "https://via.placeholder.com/80" },
  { id: 20, name: "Apoorva Mehta", company: "Instacart", position: "TE", followers: "320K", engagement: 7.7, points: 0, image: "https://via.placeholder.com/80" },
  { id: 21, name: "Jeff Weiner", company: "LinkedIn", position: "QB", followers: "3.2M", engagement: 9.6, points: 0, image: "https://via.placeholder.com/80" },
  { id: 22, name: "Sheryl Sandberg", company: "Meta", position: "RB", followers: "2.9M", engagement: 9.1, points: 0, image: "https://via.placeholder.com/80" },
  { id: 23, name: "Eric Yuan", company: "Zoom", position: "K", followers: "1.3M", engagement: 8.8, points: 0, image: "https://via.placeholder.com/80" },
  { id: 24, name: "John Collison", company: "Stripe", position: "WR", followers: "590K", engagement: 8.5, points: 0, image: "https://via.placeholder.com/80" },
];

export default function FounderBattle() {
  const [draftedTeam, setDraftedTeam] = useState<Founder[]>([]);
  const [showBattle, setShowBattle] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompleteDraft = async () => {
    if (draftedTeam.length < 8) {
      alert(`Please select ${8 - draftedTeam.length} more founder(s) to complete your team!`);
      return;
    }

    setLoading(true);
    setShowBattle(true);

    // Generate battle using Claude API
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are simulating a week-long LinkedIn fantasy founder battle. Generate realistic LinkedIn activities and engagement data for a matchup.

Player's Team: ${draftedTeam.map(f => `${f.name} (${f.company})`).join(', ')}

Generate:
1. 15-25 realistic LinkedIn activities for the week (posts, comments, funding announcements, media features, milestones)
2. Engagement metrics (likes, comments, shares) based on each founder's typical reach
3. Point values for each activity
4. Final stats for each founder

Return ONLY a JSON object (no markdown, no preamble) with this structure:
{
  "activities": [
    {
      "founderId": 1,
      "founderName": "Elon Musk",
      "type": "post",
      "description": "Shared thoughts on AI safety and regulation",
      "points": 45,
      "timestamp": "2025-11-03T10:30:00Z",
      "engagement": { "likes": 45000, "comments": 2300, "shares": 890 }
    }
  ],
  "founderStats": [
    {
      "founderId": 1,
      "totalPoints": 185,
      "activities": 4,
      "topPerformance": "Viral post about Mars mission updates"
    }
  ]
}

Make activities realistic and diverse. Include different activity types: posts, comments, funding announcements, media mentions, company milestones.`
            }
          ],
        })
      });

      const data = await response.json();
      const contentText = data.content.find((c: any) => c.type === 'text')?.text || '';
      const cleanJson = contentText.replace(/```json\n?|\n?```/g, '').trim();
      const battleData = JSON.parse(cleanJson);

      // Calculate scores
      const playerScore = battleData.founderStats
        .filter((s: any) => draftedTeam.some(f => f.id === s.founderId))
        .reduce((sum: number, s: any) => sum + s.totalPoints, 0);

      const opponentScore = battleData.founderStats
        .filter((s: any) => !draftedTeam.some(f => f.id === s.founderId))
        .reduce((sum: number, s: any) => sum + s.totalPoints, 0);

      setMatchResult({
        playerTeamScore: playerScore,
        opponentTeamScore: opponentScore,
        winner: playerScore > opponentScore ? 'player' : opponentScore > playerScore ? 'opponent' : 'tie',
        activities: battleData.activities,
        founderStats: battleData.founderStats
      });

    } catch (error) {
      console.error('Battle generation failed:', error);
      alert('Failed to generate battle. Please try again.');
      setShowBattle(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleFounder = (founder: Founder) => {
    if (draftedTeam.find(f => f.id === founder.id)) {
      setDraftedTeam(draftedTeam.filter(f => f.id !== founder.id));
    } else if (draftedTeam.length < 8) {
      setDraftedTeam([...draftedTeam, founder]);
    }
  };

  const opponentTeam = SAMPLE_FOUNDERS.filter(f => !draftedTeam.find(d => d.id === f.id)).slice(0, 8);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageSquare className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'funding': return <DollarSign className="w-4 h-4" />;
      case 'media': return <TrendingUp className="w-4 h-4" />;
      case 'milestone': return <Award className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (!showBattle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Draft Your Team</h1>
          <p className="text-gray-600 mb-8">Select 8 founders to build your fantasy team</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Founders</h2>
              <div className="space-y-3">
                {SAMPLE_FOUNDERS.map(founder => {
                  const isDrafted = draftedTeam.find(f => f.id === founder.id);
                  return (
                    <div
                      key={founder.id}
                      onClick={() => toggleFounder(founder)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isDrafted
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-white hover:shadow-md border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{founder.name}</h3>
                          <p className="text-sm text-gray-600">{founder.company}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-gray-500">
                              <Users className="w-4 h-4 inline mr-1" />
                              {founder.followers}
                            </span>
                            <span className="text-gray-500">
                              Engagement: {founder.engagement}
                            </span>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          isDrafted ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}>
                          {isDrafted && <span className="text-white">✓</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Team ({draftedTeam.length}/8)</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                {draftedTeam.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No founders selected yet</p>
                ) : (
                  <div className="space-y-3 mb-6">
                    {draftedTeam.map(founder => (
                      <div key={founder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-semibold">{founder.name}</p>
                          <p className="text-sm text-gray-600">{founder.company}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {founder.position}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleCompleteDraft}
                  disabled={draftedTeam.length !== 8}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    draftedTeam.length === 8
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {draftedTeam.length === 8 ? 'Start Battle!' : `Select ${8 - draftedTeam.length} More`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900">Simulating Week-Long Battle...</h2>
          <p className="text-gray-600 mt-2">Analyzing LinkedIn activities and engagement</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Week 1 Battle Results</h1>
          <p className="text-gray-600">November 3-9, 2025</p>
        </div>

        {/* Score Overview */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your Team</h3>
              <div className="text-5xl font-bold text-blue-600">{matchResult?.playerTeamScore || 0}</div>
            </div>
            <div className="text-center">
              <Trophy className={`w-16 h-16 mx-auto mb-2 ${
                matchResult?.winner === 'player' ? 'text-yellow-500' :
                matchResult?.winner === 'opponent' ? 'text-gray-400' : 'text-orange-500'
              }`} />
              <p className="text-2xl font-bold">
                {matchResult?.winner === 'player' ? 'Victory!' :
                 matchResult?.winner === 'opponent' ? 'Defeat' : 'Tie!'}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Opponent</h3>
              <div className="text-5xl font-bold text-red-600">{matchResult?.opponentTeamScore || 0}</div>
            </div>
          </div>
        </div>

        {/* Team Lineups */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Team</h2>
            <div className="space-y-3">
              {draftedTeam.map(founder => {
                const stats = matchResult?.founderStats.find(s => s.founderId === founder.id);
                return (
                  <div key={founder.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{founder.name}</p>
                        <p className="text-sm text-gray-600">{founder.company}</p>
                        {stats && (
                          <p className="text-xs text-gray-500 mt-1">{stats.topPerformance}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{stats?.totalPoints || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.activities || 0} activities</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Opponent Team</h2>
            <div className="space-y-3">
              {opponentTeam.map(founder => {
                const stats = matchResult?.founderStats.find(s => s.founderId === founder.id);
                return (
                  <div key={founder.id} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{founder.name}</p>
                        <p className="text-sm text-gray-600">{founder.company}</p>
                        {stats && (
                          <p className="text-xs text-gray-500 mt-1">{stats.topPerformance}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{stats?.totalPoints || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.activities || 0} activities</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Week Activity Log</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {matchResult?.activities.map((activity) => {
              const isPlayerTeam = draftedTeam.some(f => f.id === activity.founderId);
              return (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    isPlayerTeam ? 'bg-blue-50 border-blue-500' : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${isPlayerTeam ? 'bg-blue-100' : 'bg-red-100'}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold">{activity.founderName}</p>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          isPlayerTeam ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          +{activity.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                      {activity.engagement && (
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span>👍 {activity.engagement.likes.toLocaleString()}</span>
                          <span>💬 {activity.engagement.comments.toLocaleString()}</span>
                          <span>🔄 {activity.engagement.shares.toLocaleString()}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => {
              setShowBattle(false);
              setMatchResult(null);
              setDraftedTeam([]);
            }}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
          >
            Draft New Team
          </button>
          <button
            onClick={handleCompleteDraft}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            Simulate Another Week
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}