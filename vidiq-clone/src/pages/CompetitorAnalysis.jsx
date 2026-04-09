function CompetitorAnalysis() {
  const competitors = [
    { name: 'Tech Guru', subscribers: '2.1M', avgViews: '145K', videos: 523, engagement: '5.2%', growth: '+8.5%' },
    { name: 'Digital Creator', subscribers: '1.8M', avgViews: '120K', videos: 412, engagement: '4.8%', growth: '+6.2%' },
    { name: 'Content King', subscribers: '1.5M', avgViews: '98K', videos: 387, engagement: '4.5%', growth: '+5.1%' },
    { name: 'Video Master', subscribers: '1.2M', avgViews: '85K', videos: 298, engagement: '4.1%', growth: '+3.8%' },
  ]

  const getGrowthColor = (growth) => {
    const value = parseFloat(growth)
    if (value >= 7) return 'text-green-600'
    if (value >= 4) return 'text-blue-600'
    return 'text-yellow-600'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Competitor Analysis</h1>
        <p className="text-gray-600">Track and analyze your competitors performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500 mb-2">Avg Competitor Subs</p>
          <p className="text-2xl font-bold text-gray-900">1.65M</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500 mb-2">Avg Views/Video</p>
          <p className="text-2xl font-bold text-gray-900">112K</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500 mb-2">Total Videos</p>
          <p className="text-2xl font-bold text-gray-900">1,620</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-500 mb-2">Avg Engagement</p>
          <p className="text-2xl font-bold text-gray-900">4.65%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Top Competitors</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Videos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitors.map((competitor, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {competitor.name.charAt(0)}
                      </div>
                      <span className="ml-3 font-medium text-gray-900">{competitor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{competitor.subscribers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{competitor.avgViews}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{competitor.videos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{competitor.engagement}</td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${getGrowthColor(competitor.growth)}`}>
                    {competitor.growth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">
                      Analyze
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 font-medium">
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Competitive Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-purple-100 mb-2">Your Position</p>
            <p className="text-3xl font-bold">#5</p>
            <p className="text-sm text-purple-100 mt-1">Out of top 10 in your niche</p>
          </div>
          <div>
            <p className="text-purple-100 mb-2">Opportunity Score</p>
            <p className="text-3xl font-bold">78/100</p>
            <p className="text-sm text-purple-100 mt-1">Room for improvement</p>
          </div>
          <div>
            <p className="text-purple-100 mb-2">Market Share</p>
            <p className="text-3xl font-bold">12.3%</p>
            <p className="text-sm text-purple-100 mt-1">Growing steadily</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitorAnalysis
