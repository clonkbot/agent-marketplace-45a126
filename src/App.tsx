import { useState, useEffect } from 'react'

interface AgentToken {
  id: string
  name: string
  ticker: string
  price: number
  change24h: number
  volume: number
  holders: number
  avatar: string
  status: 'active' | 'dormant' | 'evolving'
}

const mockTokens: AgentToken[] = [
  { id: '1', name: 'Neural Nexus', ticker: '$NEXUS', price: 0.0847, change24h: 12.5, volume: 234567, holders: 1243, avatar: '🧠', status: 'active' },
  { id: '2', name: 'Quantum Mind', ticker: '$QMIND', price: 0.0234, change24h: -5.2, volume: 87234, holders: 567, avatar: '⚛️', status: 'evolving' },
  { id: '3', name: 'Synthetic Soul', ticker: '$SOUL', price: 0.1523, change24h: 45.8, volume: 567890, holders: 2341, avatar: '👁️', status: 'active' },
  { id: '4', name: 'Data Daemon', ticker: '$DAEMON', price: 0.0089, change24h: -12.3, volume: 34567, holders: 234, avatar: '👾', status: 'dormant' },
  { id: '5', name: 'Logic Loop', ticker: '$LOOP', price: 0.0567, change24h: 8.7, volume: 123456, holders: 876, avatar: '♾️', status: 'active' },
  { id: '6', name: 'Echo Protocol', ticker: '$ECHO', price: 0.0345, change24h: 23.1, volume: 456789, holders: 1567, avatar: '📡', status: 'evolving' },
]

function App() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'deploy' | 'trade'>('marketplace')
  const [tokens, setTokens] = useState<AgentToken[]>(mockTokens)
  const [deployForm, setDeployForm] = useState({ name: '', ticker: '', supply: '1000000' })
  const [tradeForm, setTradeForm] = useState({ token: '$NEXUS', amount: '', action: 'buy' })
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploySuccess, setDeploySuccess] = useState(false)
  const [glitchHeader, setGlitchHeader] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchHeader(true)
      setTimeout(() => setGlitchHeader(false), 150)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleDeploy = () => {
    if (!deployForm.name || !deployForm.ticker) return
    setIsDeploying(true)
    setTimeout(() => {
      const newToken: AgentToken = {
        id: String(tokens.length + 1),
        name: deployForm.name,
        ticker: deployForm.ticker.startsWith('$') ? deployForm.ticker : `$${deployForm.ticker}`,
        price: Math.random() * 0.1,
        change24h: 0,
        volume: 0,
        holders: 1,
        avatar: '🤖',
        status: 'evolving'
      }
      setTokens([newToken, ...tokens])
      setIsDeploying(false)
      setDeploySuccess(true)
      setTimeout(() => setDeploySuccess(false), 3000)
      setDeployForm({ name: '', ticker: '', supply: '1000000' })
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#05060a] text-white grid-bg data-rain relative overflow-x-hidden">
      {/* Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff9d] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff00ff] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00d4ff] opacity-5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#00ff9d20]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="text-4xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🤖</div>
                <div className="absolute -inset-2 bg-[#00ff9d] opacity-20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 
                  className={`font-['Orbitron'] text-2xl font-bold tracking-wider ${glitchHeader ? 'glitch-text' : ''}`}
                  style={{ textShadow: '0 0 10px #00ff9d, 0 0 20px #00ff9d40' }}
                >
                  AGENT<span className="text-[#00ff9d]">MARKETPLACE</span>
                </h1>
                <p className="font-['Share_Tech_Mono'] text-xs text-[#00ff9d80] tracking-widest">
                  $AGENTMARKETPLACE • POWERED BY CLANKER
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-panel px-4 py-2 rounded-lg">
                <span className="font-['Share_Tech_Mono'] text-xs text-gray-500">FEE RECIPIENT</span>
                <p className="font-['Share_Tech_Mono'] text-xs text-[#00ff9d] truncate max-w-[200px]">
                  0xbcdd...3b57
                </p>
              </div>
              <button className="relative group px-6 py-3 overflow-hidden rounded-lg">
                <div className="absolute inset-0 cyber-border opacity-80" />
                <div className="absolute inset-[2px] bg-[#0a0f19] rounded-md" />
                <span className="relative font-['Orbitron'] text-sm font-semibold tracking-wider text-[#00ff9d]">
                  CONNECT WALLET
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-2">
          {[
            { id: 'marketplace', label: 'MARKETPLACE', icon: '📊' },
            { id: 'deploy', label: 'DEPLOY TOKEN', icon: '🚀' },
            { id: 'trade', label: 'TRADE', icon: '💱' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`relative px-6 py-3 font-['Orbitron'] text-sm tracking-wider transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'text-[#00ff9d]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeTab === tab.id && (
                <>
                  <div className="absolute inset-0 bg-[#00ff9d10] border border-[#00ff9d40] rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00ff9d]" style={{ boxShadow: '0 0 10px #00ff9d' }} />
                </>
              )}
              <span className="relative flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-['Orbitron'] text-xl font-semibold tracking-wide">
                ACTIVE <span className="text-[#00ff9d]">AGENTS</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-[#00ff9d]">●</span>
                  <span className="font-['Share_Tech_Mono'] text-sm text-gray-400">{tokens.length} TOKENS LISTED</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {tokens.map((token, index) => (
                <div 
                  key={token.id}
                  className="glass-panel rounded-xl p-6 hover:border-[#00ff9d40] transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="text-4xl group-hover:scale-110 transition-transform">{token.avatar}</div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f19] ${
                          token.status === 'active' ? 'bg-[#00ff9d]' :
                          token.status === 'evolving' ? 'bg-[#ff00ff]' : 'bg-gray-500'
                        }`} style={{ boxShadow: token.status === 'active' ? '0 0 10px #00ff9d' : token.status === 'evolving' ? '0 0 10px #ff00ff' : 'none' }} />
                      </div>
                      <div>
                        <h3 className="font-['Orbitron'] font-semibold tracking-wide group-hover:text-[#00ff9d] transition-colors">
                          {token.name}
                        </h3>
                        <p className="font-['Share_Tech_Mono'] text-sm text-[#00d4ff]">{token.ticker}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-['Share_Tech_Mono'] text-lg">${token.price.toFixed(4)}</p>
                        <p className={`font-['Share_Tech_Mono'] text-sm ${token.change24h >= 0 ? 'text-[#00ff9d]' : 'text-[#ff4757]'}`}>
                          {token.change24h >= 0 ? '↑' : '↓'} {Math.abs(token.change24h)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-['Share_Tech_Mono'] text-sm text-gray-400">VOL 24H</p>
                        <p className="font-['Share_Tech_Mono']">${token.volume.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-['Share_Tech_Mono'] text-sm text-gray-400">HOLDERS</p>
                        <p className="font-['Share_Tech_Mono']">{token.holders.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { setTradeForm({ ...tradeForm, token: token.ticker }); setActiveTab('trade'); }}
                        className="relative px-6 py-2 overflow-hidden rounded-lg group/btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d] to-[#00d4ff] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                        <span className="relative font-['Orbitron'] text-sm font-semibold text-[#0a0f19]">TRADE</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-['Orbitron'] text-3xl font-bold tracking-wide mb-2">
                DEPLOY YOUR <span className="neon-cyan">AGENT TOKEN</span>
              </h2>
              <p className="font-['Rajdhani'] text-gray-400">
                Launch your agent token on the marketplace via Clanker Protocol
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] cyber-border" />
              
              {deploySuccess && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f19]/95 z-10">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="font-['Orbitron'] text-2xl font-bold text-[#00ff9d] neon-cyan mb-2">
                      TOKEN DEPLOYED!
                    </h3>
                    <p className="font-['Share_Tech_Mono'] text-gray-400">Your agent is now live on the marketplace</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block font-['Orbitron'] text-sm tracking-wider text-gray-400 mb-2">
                    AGENT NAME
                  </label>
                  <input
                    type="text"
                    value={deployForm.name}
                    onChange={(e) => setDeployForm({ ...deployForm, name: e.target.value })}
                    placeholder="Neural Nexus"
                    className="w-full bg-[#0a0f19] border border-[#00ff9d30] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff9d] focus:outline-none focus:ring-1 focus:ring-[#00ff9d40] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-['Orbitron'] text-sm tracking-wider text-gray-400 mb-2">
                    TICKER SYMBOL
                  </label>
                  <input
                    type="text"
                    value={deployForm.ticker}
                    onChange={(e) => setDeployForm({ ...deployForm, ticker: e.target.value.toUpperCase() })}
                    placeholder="$NEXUS"
                    className="w-full bg-[#0a0f19] border border-[#00ff9d30] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff9d] focus:outline-none focus:ring-1 focus:ring-[#00ff9d40] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-['Orbitron'] text-sm tracking-wider text-gray-400 mb-2">
                    INITIAL SUPPLY
                  </label>
                  <input
                    type="text"
                    value={deployForm.supply}
                    onChange={(e) => setDeployForm({ ...deployForm, supply: e.target.value })}
                    placeholder="1000000"
                    className="w-full bg-[#0a0f19] border border-[#00ff9d30] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#00ff9d] focus:outline-none focus:ring-1 focus:ring-[#00ff9d40] transition-all"
                  />
                </div>

                <div className="glass-panel rounded-lg p-4 border-[#ff00ff30]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#ff00ff]">⚡</span>
                    <span className="font-['Orbitron'] text-sm tracking-wider">CLANKER DEPLOYMENT</span>
                  </div>
                  <div className="space-y-2 font-['Share_Tech_Mono'] text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Fee Recipient:</span>
                      <span className="text-[#00ff9d]">0xbcdda8071cd061cbe600f1acf8e2d02013723b57</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protocol Fee:</span>
                      <span className="text-[#00d4ff]">1%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDeploy}
                  disabled={isDeploying || !deployForm.name || !deployForm.ticker}
                  className="w-full relative py-4 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d] via-[#00d4ff] to-[#ff00ff] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="relative font-['Orbitron'] text-lg font-bold text-[#0a0f19] tracking-wider flex items-center justify-center gap-3">
                    {isDeploying ? (
                      <>
                        <span className="animate-spin">⚙️</span>
                        DEPLOYING...
                      </>
                    ) : (
                      <>
                        🚀 DEPLOY AGENT TOKEN
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trade Tab */}
        {activeTab === 'trade' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Trading Panel */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]" />
                
                <h3 className="font-['Orbitron'] text-xl font-semibold tracking-wide mb-6 flex items-center gap-2">
                  <span className="text-[#00ff9d]">💱</span> SWAP
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-[#0a0f19] rounded-lg">
                    {['buy', 'sell'].map((action) => (
                      <button
                        key={action}
                        onClick={() => setTradeForm({ ...tradeForm, action })}
                        className={`flex-1 py-2 rounded-md font-['Orbitron'] text-sm tracking-wider transition-all ${
                          tradeForm.action === action
                            ? action === 'buy' 
                              ? 'bg-[#00ff9d] text-[#0a0f19]' 
                              : 'bg-[#ff4757] text-white'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {action.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block font-['Orbitron'] text-xs tracking-wider text-gray-400 mb-2">
                      SELECT TOKEN
                    </label>
                    <select
                      value={tradeForm.token}
                      onChange={(e) => setTradeForm({ ...tradeForm, token: e.target.value })}
                      className="w-full bg-[#0a0f19] border border-[#00ff9d30] rounded-lg px-4 py-3 text-white focus:border-[#00ff9d] focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      {tokens.map((t) => (
                        <option key={t.id} value={t.ticker}>{t.ticker} - {t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Orbitron'] text-xs tracking-wider text-gray-400 mb-2">
                      AMOUNT (ETH)
                    </label>
                    <input
                      type="text"
                      value={tradeForm.amount}
                      onChange={(e) => setTradeForm({ ...tradeForm, amount: e.target.value })}
                      placeholder="0.0"
                      className="w-full bg-[#0a0f19] border border-[#00ff9d30] rounded-lg px-4 py-3 text-2xl text-white placeholder-gray-600 focus:border-[#00ff9d] focus:outline-none focus:ring-1 focus:ring-[#00ff9d40] transition-all"
                    />
                    <div className="flex gap-2 mt-2">
                      {['0.1', '0.5', '1.0', 'MAX'].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setTradeForm({ ...tradeForm, amount: preset === 'MAX' ? '10.0' : preset })}
                          className="px-3 py-1 bg-[#00ff9d10] border border-[#00ff9d30] rounded text-xs font-['Share_Tech_Mono'] text-[#00ff9d] hover:bg-[#00ff9d20] transition-colors"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-lg p-4 space-y-2">
                    <div className="flex justify-between font-['Share_Tech_Mono'] text-sm">
                      <span className="text-gray-400">You {tradeForm.action === 'buy' ? 'pay' : 'receive'}:</span>
                      <span>{tradeForm.amount || '0'} ETH</span>
                    </div>
                    <div className="flex justify-between font-['Share_Tech_Mono'] text-sm">
                      <span className="text-gray-400">You {tradeForm.action === 'buy' ? 'receive' : 'pay'}:</span>
                      <span className="text-[#00ff9d]">
                        {tradeForm.amount ? (parseFloat(tradeForm.amount) * 12500).toLocaleString() : '0'} {tradeForm.token}
                      </span>
                    </div>
                    <div className="flex justify-between font-['Share_Tech_Mono'] text-sm">
                      <span className="text-gray-400">Fee:</span>
                      <span className="text-[#ff00ff]">1%</span>
                    </div>
                  </div>

                  <button className="w-full relative py-4 rounded-xl overflow-hidden group">
                    <div className={`absolute inset-0 ${tradeForm.action === 'buy' ? 'bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]' : 'bg-gradient-to-r from-[#ff4757] to-[#ff00ff]'} opacity-90 group-hover:opacity-100 transition-opacity`} />
                    <span className="relative font-['Orbitron'] text-lg font-bold text-[#0a0f19] tracking-wider">
                      {tradeForm.action.toUpperCase()} {tradeForm.token}
                    </span>
                  </button>
                </div>
              </div>

              {/* Price Chart Placeholder */}
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff00ff] to-[#00d4ff]" />
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-['Orbitron'] text-xl font-semibold tracking-wide flex items-center gap-2">
                    <span className="text-[#00d4ff]">📈</span> {tradeForm.token}
                  </h3>
                  <div className="flex gap-2">
                    {['1H', '24H', '7D', '30D'].map((period) => (
                      <button
                        key={period}
                        className="px-3 py-1 bg-[#0a0f19] border border-[#00ff9d30] rounded text-xs font-['Share_Tech_Mono'] text-gray-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all"
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Chart */}
                <div className="h-64 relative">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,150 Q50,140 80,120 T160,100 T240,80 T320,60 T400,40"
                      fill="none"
                      stroke="#00ff9d"
                      strokeWidth="2"
                      style={{ filter: 'drop-shadow(0 0 10px #00ff9d)' }}
                    />
                    <path
                      d="M0,150 Q50,140 80,120 T160,100 T240,80 T320,60 T400,40 L400,200 L0,200 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map((y) => (
                      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#00ff9d10" strokeWidth="1" />
                    ))}
                  </svg>
                  <div className="absolute bottom-4 left-4 font-['Share_Tech_Mono'] text-2xl text-[#00ff9d]">
                    $0.0847 <span className="text-sm text-green-400">+12.5%</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#00ff9d20]">
                  <div>
                    <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">24H HIGH</p>
                    <p className="font-['Share_Tech_Mono'] text-[#00ff9d]">$0.0923</p>
                  </div>
                  <div>
                    <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">24H LOW</p>
                    <p className="font-['Share_Tech_Mono'] text-[#ff4757]">$0.0712</p>
                  </div>
                  <div>
                    <p className="font-['Share_Tech_Mono'] text-xs text-gray-500">MARKET CAP</p>
                    <p className="font-['Share_Tech_Mono']">$847K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-[#00ff9d10] bg-[#05060a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center">
          <p className="font-['Rajdhani'] text-xs text-gray-600">
            Requested by <span className="text-gray-500">@ladu658</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App