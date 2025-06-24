import { 
  Brain,
  FileText,
  Filter,
  Settings,
  Download,
  BookOpen,
  History,
  Zap,
  Target,
  Layers,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  status: 'available' | 'coming-soon';
  gradient: string;
}

const FeaturesPage = () => {
  const [, setHoveredFeature] = useState<string | null>(null);

  const features: Feature[] = [
    {
      id: 'ai-generation',
      title: 'Smart AI-Based MCQ Generation',
      description: 'Advanced AI analyzes your PDF content and generates high-quality multiple choice questions that test real understanding, not just memorization.',
      icon: <Brain className="w-8 h-8" />,
      benefits: [
        'Contextually relevant questions',
        '90%+ accuracy rate',
        'Multiple difficulty levels',
        'Instant generation'
      ],
      status: 'available',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'pdf-parsing',
      title: 'Advanced PDF Content Parsing',
      description: 'Sophisticated OCR and content extraction technology that understands text, tables, images, and complex document structures.',
      icon: <FileText className="w-8 h-8" />,
      benefits: [
        'OCR for scanned documents',
        'Table and chart recognition',
        'Multi-column layouts',
        'Mathematical notation support'
      ],
      status: 'available',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'question-filtering',
      title: 'Intelligent Question Filtering',
      description: 'Filter and customize your generated questions by difficulty level, question type, topic, and learning objectives.',
      icon: <Filter className="w-8 h-8" />,
      benefits: [
        'Difficulty-based sorting',
        'Topic categorization',
        'Question type selection',
        'Bloom\'s taxonomy alignment'
      ],
      status: 'available',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'customizable-quizzes',
      title: 'Fully Customizable Quizzes',
      description: 'Create, edit, and personalize your quizzes with custom questions, branding, time limits, and scoring systems.',
      icon: <Settings className="w-8 h-8" />,
      benefits: [
        'Custom question editing',
        'Branding and themes',
        'Time limit controls',
        'Flexible scoring options'
      ],
      status: 'available',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'one-click-export',
      title: 'One-Click Export',
      description: 'Export your quizzes to multiple formats including PDF, Word, Google Forms, or embed codes for easy sharing and distribution.',
      icon: <Download className="w-8 h-8" />,
      benefits: [
        'Multiple export formats',
        'Print-ready PDFs',
        'Google Forms integration',
        'Embeddable quiz codes'
      ],
      status: 'available',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'lms-integration',
      title: 'LMS & Google Classroom Integration',
      description: 'Seamlessly integrate with popular Learning Management Systems and Google Classroom for streamlined quiz distribution.',
      icon: <BookOpen className="w-8 h-8" />,
      benefits: [
        'Google Classroom sync',
        'Canvas integration',
        'Moodle compatibility',
        'Blackboard support'
      ],
      status: 'coming-soon',
      gradient: 'from-teal-500 to-blue-500'
    },
    {
      id: 'quiz-history',
      title: 'Quiz History & Management',
      description: 'Organize, save, and manage all your quizzes with powerful search, tagging, and folder organization features.',
      icon: <History className="w-8 h-8" />,
      benefits: [
        'Unlimited quiz storage',
        'Smart search and filters',
        'Folder organization',
        'Version history tracking'
      ],
      status: 'available',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Questions Generated', icon: <Target className="w-6 h-6" /> },
    { number: '50K+', label: 'PDFs Processed', icon: <FileText className="w-6 h-6" /> },
    { number: '99.2%', label: 'Uptime', icon: <Zap className="w-6 h-6" /> },
    { number: '15+', label: 'Export Formats', icon: <Layers className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative z-10 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Powerful{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Features
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Discover the cutting-edge technology that makes QuizForge the most advanced quiz generation platform available today
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:bg-gray-900/70 transition-all duration-300">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                      feature.status === 'available' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>{feature.status === 'available' ? 'Available' : 'Coming Soon'}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-6`}>
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <div className="pt-4">
                      <button className={`inline-flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} hover:opacity-80 transition-opacity`}>
                        <span className="font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300 pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-gray-400">
              Start creating intelligent quizzes in seconds with our free plan
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-700 hover:border-gray-600 px-8 py-4 rounded-xl font-medium transition-all">
                View Demo
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              No credit card required • 5 free PDFs daily • Full feature access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;