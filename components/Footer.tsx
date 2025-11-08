export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fantasy Founders League</h3>
            <p className="text-gray-400">
              The ultimate fantasy league for LinkedIn founders. Draft, manage, and compete.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/draft" className="hover:text-white transition-colors">Draft</a></li>
              <li><a href="/standings" className="hover:text-white transition-colors">Standings</a></li>
              <li><a href="/my-team" className="hover:text-white transition-colors">My Team</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-gray-400">
              Built for founders, by founders. Track LinkedIn performance and build your dream team.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fantasy Founders League. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

