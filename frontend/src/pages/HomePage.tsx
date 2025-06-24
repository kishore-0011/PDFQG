import { Play, Sparkles, Settings, Download } from 'lucide-react';
import Navbar from '../components/Navbar';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
    <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Tag */}
        <div className="flex justify-center pt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Smart quiz generation from any PDF</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Turn notes into{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    quizzes.
                  </span>
                  <br />
                  Effortlessly.
                </h1>
              </div>
            </div>

            {/* Right Column - Description and CTAs */}
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                Upload a PDF, and let QuizForge generate multiple choice questions instantly — no more manual question writing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate now</span>
                </button>
                <button className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800/70 transition-all flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-8 pb-20">
          <div className="grid grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-all">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Automated Quiz Creation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Extracts key questions from any PDF automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-all">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Customizable Options</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adjust question type, difficulty, and answer style.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-all">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">One-click Export</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Save or share your quiz in various formats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;