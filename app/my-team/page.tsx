// app/my-team/page.tsx
"use client";

import React, { useState } from "react";
import { myTeam, type Founder } from "@/data/founders";

type Activity = {
  id: string;
  founderId: number;
  founderName: string;
  type: "post" | "comment" | "funding" | "media" | "milestone";
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
  totalTeamScore: number;
  activities: Activity[];
  founderStats: {
    founderId: number;
    totalPoints: number;
    activities: number;
    topPerformance: string;
  }[];
};

export default function MyTeamPage() {
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

 const handleSimulateWeek = async () => {
  setLoading(true);
  setError(null);
  setMatchResult(null);

  try {
    const response = await fetch("/api/battle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        draftedTeam: myTeam.map(({ id, name, company }) => ({
          id,
          name,
          company,
        })),
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      // Show the error coming from the backend
      throw new Error(json.error || json.message || `API error: ${response.status}`);
    }

    const battleData = json;

    const totalTeamScore = battleData.founderStats.reduce(
      (sum: number, s: any) => sum + s.totalPoints,
      0
    );

    setMatchResult({
      totalTeamScore,
      activities: battleData.activities,
      founderStats: battleData.founderStats,
    });
  } catch (err: any) {
    console.error("Failed to simulate week:", err);
    setError(err.message || "Failed to generate battle. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>My Founder Team</h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        These are the founders on your fantasy team. Data is coming from{" "}
        <code style={{ marginLeft: 4 }}>@/data/founders.ts</code>.
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {myTeam.map((founder: Founder) => (
          <li
            key={founder.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.5rem",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>{founder.name}</h2>
              <span style={{ fontSize: "0.9rem", color: "#777" }}>
                {founder.position} @ {founder.company}
              </span>
            </div>

            <div style={{ fontSize: "0.9rem", color: "#555" }}>
              <div>Followers: {founder.followers}</div>
              <div>Engagement: {founder.engagement}</div>
              <div>Fantasy Points: {founder.points}</div>
            </div>

            {founder.linkedinUrl && (
              <a
                href={founder.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                  color: "#0a66c2",
                  textDecoration: "none",
                }}
              >
                View on LinkedIn →
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Simulate Week Button */}
      <button
        onClick={handleSimulateWeek}
        disabled={loading}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          border: "none",
          fontWeight: 600,
          cursor: loading ? "default" : "pointer",
          backgroundColor: loading ? "#ccc" : "#0a66c2",
          color: "#fff",
        }}
      >
        {loading ? "Simulating week…" : "Simulate Week with AI"}
      </button>

      {/* Error */}
      {error && (
        <p style={{ marginTop: "1rem", color: "red", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* Results */}
      {matchResult && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Weekly Results
          </h2>
          <p style={{ marginBottom: "1rem", color: "#555" }}>
            Total Team Score:{" "}
            <strong>{matchResult.totalTeamScore}</strong>
          </p>

          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Founder Breakdown
          </h3>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
            {matchResult.founderStats.map((s) => {
              const founder = myTeam.find((f) => f.id === s.founderId);
              return (
                <li
                  key={s.founderId}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>
                      {founder?.name ?? `Founder ${s.founderId}`}
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {s.totalPoints} pts
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {s.activities} activities • {s.topPerformance}
                  </div>
                </li>
              );
            })}
          </ul>

          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Activity Log
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {matchResult.activities.map((activity) => (
              <li
                key={activity.id}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {activity.founderName} • {activity.type.toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    +{activity.points} pts
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginBottom: "0.25rem",
                  }}
                >
                  {activity.description}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#777",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {new Date(activity.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {activity.engagement && (
                    <span>
                      👍 {activity.engagement.likes.toLocaleString()} • 💬{" "}
                      {activity.engagement.comments.toLocaleString()} • 🔄{" "}
                      {activity.engagement.shares.toLocaleString()}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
