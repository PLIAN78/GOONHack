// app/my-team/page.tsx
import { myTeam, type Founder } from "@/data/founders";

export default function MyTeamPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>My Founder Team</h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        These are the founders on your fantasy team. Data is coming from
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
          </li>
        ))}
      </ul>
    </main>
  );
}
