import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js'
import { Doughnut, Line, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement)

function Dashboard() {
  const channelStats = {
    subscribers: '125.4K',
    totalViews: '8.2M',
    totalVideos: 342,
    avgViews: '24.1K',
    engagementRate: '4.8%',
    growthRate: '+12.3%'
  }

  const subscriberData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Subscribers',
      data: [95000, 102000, 108000, 115000, 120000, 125400],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  }

  const viewsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Views',
      data: [15200, 18400, 22100, 19800, 25600, 31200, 28900],
      backgroundColor: 'rgba(147, 51, 234, 0.7)'
    }]
  }

  const trafficSources = {
    labels: ['YouTube Search', 'Suggested Videos', 'Browse Features', 'External', 'Direct'],
    datasets: [{
      data: [35, 28, 20, 12, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(34, 197, 94, 0.8)'
      ]
    }]
  }

  const topVideos = [
    { title: 'How to Grow Your YouTube Channel in 2025', views: '125K', likes: '8.2K', score: 95 },
    { title: 'YouTube SEO Tips That Actually Work', views: '98K', likes: '6.5K', score: 92 },
    { title: 'Best Video Editing Software Review', views: '87K', likes: '5.8K', score: 89 },
    { title: 'Content Strategy for Beginners', views: '76K', likes: '4.9K', score: 87 },
    { title: 'Analytics Deep Dive Tutorial', views: '65K', likes: '4.2K', score: 85 },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
          Connect YouTube Channel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {Object.entries(channelStats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <p className="text-sm text-gray-500 capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscriber Growth</h2>
          <Line data={subscriberData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Views</h2>
          <Bar data={viewsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <Doughnut data={trafficSources} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Videos</h2>
          <div className="space-y-4">
            {topVideos.map((video, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{video.title}</p>
                  <p className="text-sm text-gray-500">{video.views} views • {video.likes} likes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    video.score >= 90 ? 'bg-green-100 text-green-700' :
                    video.score >= 85 ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    Score: {video.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
