import { useState } from 'react'

function KeywordTool() {
  const [searchTerm, setSearchTerm] = useState('')
  const [keywords, setKeywords] = useState([
    { keyword: 'youtube seo', volume: 12500, competition: 'High', score: 85, trend: '+15%' },
    { keyword: 'video optimization', volume: 8900, competition: 'Medium', score: 78, trend: '+8%' },
    { keyword: 'youtube tags', volume: 6700, competition: 'Low', score: 92, trend: '+22%' },
    { keyword: 'video titles', volume: 5400, competition: 'Medium', score: 81, trend: '+5%' },
    { keyword: 'youtube analytics', volume: 4800, competition: 'High', score: 73, trend: '-3%' },
    { keyword: 'content strategy', volume: 3900, competition: 'Low', score: 88, trend: '+12%' },
    { keyword: 'video marketing', volume: 3200, competition: 'Medium', score: 76, trend: '+7%' },
    { keyword: 'youtube growth', volume: 2800, competition: 'Low', score: 94, trend: '+18%' },
  ])

  const handleSearch = (e) => {
    e.preventDefault()
    // Simulate search - in real app would call API
    console.log('Searching for:', searchTerm)
  }

  const getCompetitionColor = (competition) => {
    switch(competition) {
      case 'High': return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Keyword Research Tool</h1>
        <p className="text-gray-600">Discover high-performing keywords to optimize your YouTube videos</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a seed keyword..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Search
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Keyword Suggestions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Search Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {keywords.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{item.keyword}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{item.volume.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(item.competition)}`}>
                      {item.competition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.score >= 90 ? 'bg-green-500' :
                            item.score >= 75 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Keyword Ideas</h3>
          <p className="text-3xl font-bold">2,847</p>
          <p className="text-blue-100 text-sm mt-1">Based on your niche</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Avg. Competition</h3>
          <p className="text-3xl font-bold">Medium</p>
          <p className="text-purple-100 text-sm mt-1">Good opportunities</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Top Score</h3>
          <p className="text-3xl font-bold">94</p>
          <p className="text-green-100 text-sm mt-1">Highest SEO potential</p>
        </div>
      </div>
    </div>
  )
}

export default KeywordTool
