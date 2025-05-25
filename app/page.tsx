export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Wellivian</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white px-3 py-2">Features</button>
              <button className="text-gray-300 hover:text-white px-3 py-2">Pricing</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Vitruvian Man Style Illustration */}
          <div className="relative w-full max-w-2xl mx-auto mb-12">
            <svg viewBox="0 0 500 500" className="w-full h-auto">
              {/* Background Circle */}
              <circle cx="250" cy="250" r="240" fill="none" stroke="url(#gradient)" strokeWidth="2" opacity="0.3"/>
              <circle cx="250" cy="250" r="220" fill="none" stroke="url(#gradient)" strokeWidth="1" opacity="0.2"/>
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              
              {/* Vitruvian Man Simplified */}
              <g transform="translate(250, 250)">
                {/* Body */}
                <line x1="0" y1="-50" x2="0" y2="50" stroke="#60A5FA" strokeWidth="2" opacity="0.8"/>
                {/* Arms spread */}
                <line x1="-80" y1="-20" x2="80" y2="-20" stroke="#60A5FA" strokeWidth="2" opacity="0.8"/>
                {/* Arms up */}
                <line x1="-60" y1="-60" x2="-20" y2="-30" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6"/>
                <line x1="60" y1="-60" x2="20" y2="-30" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6"/>
                {/* Legs */}
                <line x1="0" y1="50" x2="-30" y2="90" stroke="#60A5FA" strokeWidth="2" opacity="0.8"/>
                <line x1="0" y1="50" x2="30" y2="90" stroke="#60A5FA" strokeWidth="2" opacity="0.8"/>
                {/* Legs spread */}
                <line x1="0" y1="50" x2="-50" y2="80" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6"/>
                <line x1="0" y1="50" x2="50" y2="80" stroke="#60A5FA" strokeWidth="1.5" opacity="0.6"/>
                {/* Head */}
                <circle cx="0" cy="-65" r="15" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.8"/>
              </g>
              
              {/* Device Icons Around the Circle */}
              {/* Apple Watch - Top */}
              <g transform="translate(250, 30)">
                <rect x="-15" y="-20" width="30" height="40" rx="8" fill="none" stroke="#10B981" strokeWidth="2"/>
                <circle cx="15" cy="0" r="3" fill="#10B981"/>
                <text x="0" y="35" textAnchor="middle" className="text-xs fill-gray-400">Apple Watch</text>
              </g>
              
              {/* Oura Ring - Top Right */}
              <g transform="translate(380, 120)">
                <circle cx="0" cy="0" r="12" fill="none" stroke="#8B5CF6" strokeWidth="3"/>
                <circle cx="0" cy="0" r="8" fill="none" stroke="#8B5CF6" strokeWidth="1"/>
                <text x="0" y="25" textAnchor="middle" className="text-xs fill-gray-400">Oura</text>
              </g>
              
              {/* Garmin - Right */}
              <g transform="translate(420, 250)">
                <circle cx="0" cy="0" r="18" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                <path d="M -10,-5 L 0,5 L 10,-5" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                <text x="0" y="35" textAnchor="middle" className="text-xs fill-gray-400">Garmin</text>
              </g>
              
              {/* Stryd - Bottom Right */}
              <g transform="translate(380, 380)">
                <ellipse cx="0" cy="0" rx="15" ry="10" fill="none" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M -8,0 L 8,0 M 0,-5 L 0,5" stroke="#F59E0B" strokeWidth="1.5"/>
                <text x="0" y="25" textAnchor="middle" className="text-xs fill-gray-400">Stryd</text>
              </g>
              
              {/* CGM - Bottom */}
              <g transform="translate(250, 440)">
                <circle cx="0" cy="0" r="15" fill="none" stroke="#EC4899" strokeWidth="2"/>
                <circle cx="0" cy="0" r="3" fill="#EC4899"/>
                <path d="M 0,0 L 0,-10" stroke="#EC4899" strokeWidth="2"/>
                <text x="0" y="30" textAnchor="middle" className="text-xs fill-gray-400">CGM</text>
              </g>
              
              {/* Function Health - Bottom Left */}
              <g transform="translate(120, 380)">
                <rect x="-15" y="-10" width="30" height="20" rx="4" fill="none" stroke="#6366F1" strokeWidth="2"/>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#6366F1" strokeWidth="1"/>
                <line x1="-5" y1="-5" x2="-5" y2="5" stroke="#6366F1" strokeWidth="1"/>
                <line x1="0" y1="-3" x2="0" y2="3" stroke="#6366F1" strokeWidth="1"/>
                <line x1="5" y1="-5" x2="5" y2="5" stroke="#6366F1" strokeWidth="1"/>
                <text x="0" y="25" textAnchor="middle" className="text-xs fill-gray-400">Labs</text>
              </g>
              
              {/* Strength Training - Left */}
              <g transform="translate(80, 250)">
                <rect x="-3" y="-15" width="6" height="30" rx="3" fill="none" stroke="#EF4444" strokeWidth="2"/>
                <circle cx="-10" cy="-15" r="5" fill="none" stroke="#EF4444" strokeWidth="2"/>
                <circle cx="10" cy="-15" r="5" fill="none" stroke="#EF4444" strokeWidth="2"/>
                <circle cx="-10" cy="15" r="5" fill="none" stroke="#EF4444" strokeWidth="2"/>
                <circle cx="10" cy="15" r="5" fill="none" stroke="#EF4444" strokeWidth="2"/>
                <text x="0" y="35" textAnchor="middle" className="text-xs fill-gray-400">Strength</text>
              </g>
              
              {/* Apple Health - Top Left */}
              <g transform="translate(120, 120)">
                <path d="M 0,-15 C -8,-15 -15,-8 -15,0 C -15,8 -8,15 0,15 C 8,15 15,8 15,0 C 15,-8 8,-15 0,-15 Z" 
                      fill="none" stroke="#DC2626" strokeWidth="2"/>
                <path d="M 0,-5 L 0,5 M -5,0 L 5,0" stroke="#DC2626" strokeWidth="2"/>
                <text x="0" y="30" textAnchor="middle" className="text-xs fill-gray-400">Health</text>
              </g>
              
              {/* AI Brain - Center top of human */}
              <g transform="translate(250, 150)">
                <circle cx="0" cy="0" r="8" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.8"/>
                <circle cx="-3" cy="-2" r="1.5" fill="#A78BFA" opacity="0.8"/>
                <circle cx="3" cy="-2" r="1.5" fill="#A78BFA" opacity="0.8"/>
                <circle cx="0" cy="3" r="1.5" fill="#A78BFA" opacity="0.8"/>
              </g>
              
              {/* Connecting Lines */}
              <g opacity="0.2">
                <line x1="250" y1="30" x2="250" y2="150" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="380" y1="120" x2="250" y2="200" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="420" y1="250" x2="300" y2="250" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="380" y1="380" x2="280" y2="300" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="250" y1="440" x2="250" y2="320" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="120" y1="380" x2="220" y2="300" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="80" y1="250" x2="200" y2="250" stroke="url(#gradient)" strokeWidth="1"/>
                <line x1="120" y1="120" x2="220" y2="200" stroke="url(#gradient)" strokeWidth="1"/>
              </g>
            </svg>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Health Command Center
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Finally, all your health data in one place. Smart insights that celebrate progress, 
              not just flag problems. Built for people who take their health seriously.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="border border-gray-600 hover:border-gray-400 text-white text-lg px-8 py-4 rounded-lg transition">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-sm">Health Metrics Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm">Device Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">94%</div>
              <div className="text-sm">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">HIPAA</div>
              <div className="text-sm">Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Everything You Need to Optimize Your Health
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Stop switching between apps. Wellivian brings together all your health data 
            with AI-powered insights that actually make sense.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Strength Tracker */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Strength Tracker</h3>
              <p className="text-gray-400 mb-4">
                Intelligent exercise pairing, 3-minute superset timers, and RPE tracking. 
                Built for compound movements and training to failure.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Antagonist superset optimization</li>
                <li>• Progress tracking & PR alerts</li>
                <li>• Rest timer with exercise switching</li>
              </ul>
            </div>

            {/* Comprehensive Health Score */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Context-Aware Insights</h3>
              <p className="text-gray-400 mb-4">
                No more red failure screens. We show your victories, provide context for 
                concerning metrics, and celebrate progress.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Victory tracking & celebrations</li>
                <li>• Nuanced biomarker interpretation</li>
                <li>• Long-term trend analysis</li>
              </ul>
            </div>

            {/* Device Integration */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500 transition">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">All Devices, One Platform</h3>
              <p className="text-gray-400 mb-4">
                Seamlessly integrate Apple Watch, Oura Ring, Stryd, CGMs, and lab results. 
                No more app switching or manual logging.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Apple Health & Oura Ring</li>
                <li>• Stryd & Function Health</li>
                <li>• CGMs & custom devices</li>
              </ul>
            </div>

            {/* AI Coach */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Coach That Gets You</h3>
              <p className="text-gray-400 mb-4">
                Based on cutting-edge longevity science from Outlive and Good Energy. 
                Personalized protocols that adapt to your data.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Evidence-based recommendations</li>
                <li>• Adapts to your patterns</li>
                <li>• Proactive health optimization</li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Correlations That Matter</h3>
              <p className="text-gray-400 mb-4">
                Discover how your sleep affects your lifts, how glucose impacts recovery, 
                and what actually moves your biomarkers.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Multi-factor analysis</li>
                <li>• Predictive insights</li>
                <li>• Actionable patterns</li>
              </ul>
            </div>

            {/* Privacy First */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500 transition">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Your Data, Your Control</h3>
              <p className="text-gray-400 mb-4">
                Bank-level encryption, HIPAA compliant, and you own your data. 
                Export anytime, delete anytime, no questions asked.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• End-to-end encryption</li>
                <li>• HIPAA compliant</li>
                <li>• Full data portability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Get Started in Minutes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect Your Devices</h3>
              <p className="text-gray-400">
                Link your wearables and import your lab results. We handle the complexity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">See Your Full Picture</h3>
              <p className="text-gray-400">
                All your health data unified in one intelligent dashboard with context.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Get Personalized Guidance</h3>
              <p className="text-gray-400">
                AI-powered insights and protocols tailored to your unique health profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands who've discovered what their data really means. 
            No more guessing, just clear insights and real progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="text-white text-lg px-8 py-4 rounded-lg transition hover:text-gray-300">
              Watch Demo →
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Wellivian</h3>
              <p className="text-gray-400 text-sm">
                Your AI-powered health command center. All your data, one platform, real insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2024 Wellivian. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}