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
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Track Everything.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  No BS.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                All your health data. One platform. Real insights that don&apos;t sugarcoat reality. 
                Built for athletes who want the truth, not motivational quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-xl">
                  Start Free Trial
                </button>
                <button className="border border-gray-600 hover:border-gray-400 text-white text-lg px-8 py-4 rounded-lg transition backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-400">15+</div>
                  <div className="text-sm text-gray-400">Devices Synced</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">500K+</div>
                  <div className="text-sm text-gray-400">Data Points Daily</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">Real</div>
                  <div className="text-sm text-gray-400">AI Insights</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Dynamic Visualization */}
            <div className="relative">
              <div className="relative w-full max-w-xl mx-auto">
                {/* Animated Background Blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl animate-pulse"></div>
                
                {/* Tech-Athletic Data Viz */}
                <svg viewBox="0 0 600 600" className="w-full h-auto relative z-10">
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Central Performance Ring */}
                  <g transform="translate(300, 300)">
                    {/* Outer ring - HRV */}
                    <circle cx="0" cy="0" r="200" fill="none" stroke="#1F2937" strokeWidth="40" />
                    <circle cx="0" cy="0" r="200" fill="none" stroke="url(#dataGradient)" strokeWidth="40" 
                            strokeDasharray="628" strokeDashoffset="157" transform="rotate(-90)" opacity="0.9" />
                    
                    {/* Middle ring - Recovery */}
                    <circle cx="0" cy="0" r="150" fill="none" stroke="#1F2937" strokeWidth="30" />
                    <circle cx="0" cy="0" r="150" fill="none" stroke="#10B981" strokeWidth="30" 
                            strokeDasharray="471" strokeDashoffset="94" transform="rotate(-90)" opacity="0.8" />
                    
                    {/* Inner ring - Training Load */}
                    <circle cx="0" cy="0" r="110" fill="none" stroke="#1F2937" strokeWidth="25" />
                    <circle cx="0" cy="0" r="110" fill="none" stroke="#F59E0B" strokeWidth="25" 
                            strokeDasharray="346" strokeDashoffset="104" transform="rotate(-90)" opacity="0.8" />
                    
                    {/* Center Score */}
                    <text x="0" y="-10" textAnchor="middle" className="text-6xl font-bold fill-white">87</text>
                    <text x="0" y="20" textAnchor="middle" className="text-lg fill-gray-400">Performance Score</text>
                  </g>
                  
                  {/* Floating Device Icons */}
                  <g className="animate-pulse">
                    {/* Apple Watch */}
                    <g transform="translate(450, 100)" opacity="0.8">
                      <rect x="-20" y="-25" width="40" height="50" rx="10" fill="#1F2937" stroke="#10B981" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="3" fill="#10B981"/>
                    </g>
                    
                    {/* Oura */}
                    <g transform="translate(500, 300)" opacity="0.8">
                      <circle cx="0" cy="0" r="20" fill="none" stroke="#8B5CF6" strokeWidth="4"/>
                      <circle cx="0" cy="0" r="12" fill="none" stroke="#8B5CF6" strokeWidth="2"/>
                    </g>
                    
                    {/* Stryd */}
                    <g transform="translate(450, 480)" opacity="0.8">
                      <ellipse cx="0" cy="0" rx="25" ry="15" fill="#1F2937" stroke="#F59E0B" strokeWidth="2"/>
                    </g>
                    
                    {/* Barbell */}
                    <g transform="translate(100, 150)" opacity="0.8">
                      <rect x="-5" y="-30" width="10" height="60" rx="5" fill="#1F2937" stroke="#EF4444" strokeWidth="2"/>
                      <circle cx="0" cy="-30" r="12" fill="#1F2937" stroke="#EF4444" strokeWidth="2"/>
                      <circle cx="0" cy="30" r="12" fill="#1F2937" stroke="#EF4444" strokeWidth="2"/>
                    </g>
                    
                    {/* Lab Results */}
                    <g transform="translate(80, 400)" opacity="0.8">
                      <rect x="-25" y="-20" width="50" height="40" rx="5" fill="#1F2937" stroke="#6366F1" strokeWidth="2"/>
                      <line x1="-15" y1="-10" x2="15" y2="-10" stroke="#6366F1" strokeWidth="1"/>
                      <line x1="-15" y1="0" x2="10" y2="0" stroke="#6366F1" strokeWidth="1"/>
                      <line x1="-15" y1="10" x2="5" y2="10" stroke="#6366F1" strokeWidth="1"/>
                    </g>
                  </g>
                  
                  {/* Data Flow Lines */}
                  <g opacity="0.3">
                    <path d="M 450 130 Q 400 200 370 250" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
                    <path d="M 500 300 Q 450 300 400 300" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
                    <path d="M 450 450 Q 400 400 350 350" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
                    <path d="M 130 150 Q 200 200 230 250" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
                    <path d="M 130 400 Q 200 350 250 320" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
                  </g>
                  
                  {/* Floating Metrics */}
                  <g className="animate-pulse">
                    <g transform="translate(150, 250)">
                      <rect x="-40" y="-15" width="80" height="30" rx="15" fill="#1F2937/80" stroke="#3B82F6" strokeWidth="1"/>
                      <text x="0" y="5" textAnchor="middle" className="text-sm fill-white">HRV: 45ms</text>
                    </g>
                    
                    <g transform="translate(450, 350)">
                      <rect x="-45" y="-15" width="90" height="30" rx="15" fill="#1F2937/80" stroke="#10B981" strokeWidth="1"/>
                      <text x="0" y="5" textAnchor="middle" className="text-sm fill-white">Recovery: 82%</text>
                    </g>
                    
                    <g transform="translate(300, 500)">
                      <rect x="-50" y="-15" width="100" height="30" rx="15" fill="#1F2937/80" stroke="#F59E0B" strokeWidth="1"/>
                      <text x="0" y="5" textAnchor="middle" className="text-sm fill-white">Load: Optimal</text>
                    </g>
                  </g>
                </svg>
              </div>
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
            Join thousands who&apos;ve discovered what their data really means. 
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