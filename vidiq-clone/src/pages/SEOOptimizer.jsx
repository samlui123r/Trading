import { useState } from 'react'

function SEOOptimizer() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    tags: ''
  })

  const [analysis, setAnalysis] = useState(null)

  const handleAnalyze = () => {
    // Simulate SEO analysis
    setAnalysis({
      overallScore: 82,
      titleScore: 85,
      descriptionScore: 78,
      tagsScore: 84,
      recommendations: [
        { category: 'Title', priority: 'High', suggestion: 'Add primary keyword at the beginning of your title', impact: '+15% CTR' },
        { category: 'Description', priority: 'Medium', suggestion: 'Include timestamps for better user experience', impact: '+8% watch time' },
        { category: 'Tags', priority: 'Low', suggestion: 'Add 3-5 more related long-tail keywords', impact: '+5% discoverability' },
        { category: 'Thumbnail', priority: 'High', suggestion: 'Use high-contrast colors and clear text', impact: '+20% CTR' },
        { category: 'Engagement', priority: 'Medium', suggestion: 'Add call-to-action in first 30 seconds', impact: '+12% engagement' },
      ]
    })
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SEO Optimizer</h1>
        <p className="text-gray-600">Optimize your video metadata for maximum visibility</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Video Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
            <input
              type="text"
              value={videoData.title}
              onChange={(e) => setVideoData({...videoData, title: e.target.value})}
              placeholder="Enter your video title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <p className="mt-1 text-sm text-gray-500">{videoData.title.length}/100 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={videoData.description}
              onChange={(e) => setVideoData({...videoData, description: e.target.value})}
              placeholder="Enter your video description..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
            <p className="mt-1 text-sm text-gray-500">{videoData.description.length}/5000 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={videoData.tags}
              onChange={(e) => setVideoData({...videoData, tags: e.target.value})}
              placeholder="youtube, seo, tutorial, marketing..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Analyze SEO
          </button>
        </div>

        <div className="space-y-6">
          {analysis ? (
            <>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO Score</h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(analysis.overallScore / 100) * 440} 440`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Title</p>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.titleScore)}`}>{analysis.titleScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.descriptionScore)}`}>{analysis.descriptionScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Tags</p>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.tagsScore)}`}>{analysis.tagsScore}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-gray-900">{rec.category}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{rec.suggestion}</p>
                      <p className="text-green-600 text-sm font-medium">{rec.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Optimize</h3>
              <p className="text-gray-600">Enter your video details and click "Analyze SEO" to get personalized recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SEOOptimizer
