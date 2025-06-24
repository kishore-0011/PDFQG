import {
  Upload,
  Brain,
  FileText,
  Download,
  Users,
  GraduationCap,
  Building,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <Navbar />

      {/* Navigation */}

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Turn Any Study Material into a{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quiz Instantly
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Transform your PDFs into interactive multiple-choice quizzes with
              AI-powered content analysis. Perfect for students, educators, and
              businesses looking to create engaging assessments effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Start Creating Quizzes</span>
              </button>
              <button className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900/70 transition-all flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps to transform your study materials into
              interactive quizzes
            </p>
          </div>

          <div className="grid md:grid-cols-7 gap-8 items-center">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Upload your PDF</h3>
                <p className="text-gray-400 text-sm">
                  Simply drag and drop your study material or document
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">AI analyzes content</h3>
                <p className="text-gray-400 text-sm">
                  Advanced AI extracts key concepts and information
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Auto-generates MCQs</h3>
                <p className="text-gray-400 text-sm">
                  Creates multiple-choice questions with smart distractors
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Export & Share</h3>
                <p className="text-gray-400 text-sm">
                  Download or share your quiz in multiple formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">See QuizForge in Action</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the intuitive interface that makes quiz creation
              effortless
            </p>
          </div>

          {/* Demo mockup */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* Browser mockup header */}
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg px-4 py-2 ml-4">
                  <span className="text-gray-400 text-sm">
                    app.quizforge.com
                  </span>
                </div>
              </div>

              {/* Interface mockup */}
              <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Quiz Generator</h3>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg"></div>
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg"></div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Drop your PDF here or click to upload
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                    <div className="w-full h-2 bg-gray-600 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                    <div className="w-full h-2 bg-gray-600 rounded"></div>
                    <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                    <div className="w-full h-2 bg-gray-600 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                    <div className="w-5/6 h-2 bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Perfect for Everyone</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're studying, teaching, or training, QuizForge adapts
              to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 transition-all group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">For Students</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Transform your study notes, textbooks, and lecture materials
                into practice quizzes. Perfect for exam preparation and
                knowledge retention.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Self-assessment and revision</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Exam preparation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Knowledge retention</span>
                </li>
              </ul>
            </div>

            {/* Educators */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-all">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">For Educators</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Create quick assessments from your teaching materials. Generate
                quizzes for homework, pop quizzes, or comprehensive exams in
                minutes.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Quick assessment creation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Homework assignments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Comprehensive exams</span>
                </li>
              </ul>
            </div>

            {/* Businesses */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/70 transition-all group">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-all">
                <Building className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">For Businesses</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Convert training manuals, compliance documents, and educational
                materials into interactive quizzes for employee training and
                certification.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>Employee training</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>Compliance testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>Certification programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who are already creating engaging quizzes
            with QuizForge
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-4 rounded-xl font-semibold text-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
            <Sparkles className="w-6 h-6" />
            <span>Start Your Free Trial</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
