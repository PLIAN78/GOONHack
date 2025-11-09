# Fantasy Founders League

A fantasy football-style league application for LinkedIn founders. Draft, manage, and compete with teams of top LinkedIn influencers and founders.

## Features

- **Dashboard**: Overview of your team's performance, rankings, and upcoming matchups
- **Draft System**: Search and draft founders from LinkedIn to build your team
- **League Standings**: View rankings, records, and statistics for all teams
- **Team Management**: Manage your roster, track founder performance, and make trades
- **Modern UI**: Beautiful, responsive design built with Next.js and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

**If you don't have Node.js installed:**

#### Option 1: Install using Homebrew (Recommended for macOS)
```bash
# First install Homebrew if you don't have it:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Node.js (which includes npm):
brew install node
```

#### Option 2: Download from Node.js website
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version for macOS
3. Run the installer and follow the instructions
4. Verify installation by running: `node --version` and `npm --version`

#### Option 3: Using nvm (Node Version Manager)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.zshrc

# Install Node.js LTS
nvm install --lts
nvm use --lts
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
fantasy-founders-league/
├── app/
│   ├── dashboard/      # Dashboard page
│   ├── draft/          # Draft interface
│   ├── standings/      # League standings
│   ├── my-team/        # Team management
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   └── FounderCard.tsx # Founder card component
└── public/             # Static assets
```

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Next Steps

To make this a fully functional application, you'll need to:

1. **Backend Integration**: Connect to a backend API for:
   - User authentication
   - League data management
   - Founder/LinkedIn data fetching
   - Scoring calculations

2. **LinkedIn API Integration**: 
   - Fetch real LinkedIn profile data
   - Track engagement metrics
   - Monitor follower growth

3. **Real-time Updates**: 
   - WebSocket connections for live scoring
   - Push notifications for draft picks

4. **Additional Features**:
   - Trade system
   - Waiver wire
   - Matchup scheduling
   - Playoff brackets

## License

MIT

