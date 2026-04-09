import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import KeywordTool from './pages/KeywordTool'
import CompetitorAnalysis from './pages/CompetitorAnalysis'
import SEOOptimizer from './pages/SEOOptimizer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/keywords" element={<KeywordTool />} />
          <Route path="/competitors" element={<CompetitorAnalysis />} />
          <Route path="/seo" element={<SEOOptimizer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
