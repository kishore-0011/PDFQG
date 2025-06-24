import { 
  BookOpen, 
  Video, 
  MessageCircle, 
  HelpCircle, 
  ArrowRight, 
  Clock,
  User,
  ExternalLink,
  Search,
  Download,
  Play
} from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

type ResourceCategory = 'tutorial' | 'blog' | 'video';

interface Resource {
  title: string;
  description: string;
  duration: string;
  category: ResourceCategory;
  author: string;
  image: string;
}

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tutorials: Resource[] = [
    {
      title: "Getting Started with QuizForge",
      description: "Learn the basics of uploading PDFs and generating your first quiz",
      duration: "5 min read",
      category: "tutorial",
      author: "QuizForge Team",
      image: "🚀"
    },
    {
      title: "Creating the Perfect Multiple Choice Questions",
      description: "Best practices for generating effective MCQs that test real understanding",
      duration: "8 min read",
      category: "tutorial",
      author: "Dr. Sarah Chen",
      image: "✏️"
    },
    {
      title: "Advanced Quiz Customization",
      description: "How to fine-tune difficulty levels, question types, and export formats",
      duration: "12 min read",
      category: "tutorial",
      author: "Mike Rodriguez",
      image: "⚙️"
    }
  ];

  const blogPosts: Resource[] = [
    {
      title: "The Future of AI in Education",
      description: "How artificial intelligence is transforming the way we learn and teach",
      duration: "6 min read",
      category: "blog",
      author: "Prof. David Kim",
      image: "🤖"
    },
    {
      title: "Smart Studying: 10 Evidence-Based Techniques",
      description: "Research-backed methods to improve retention and learning efficiency",
      duration: "10 min read",
      category: "blog",
      author: "Lisa Thompson",
      image: "🧠"
    },
    {
      title: "Building Better Assessments with Technology",
      description: "Modern approaches to student evaluation and feedback",
      duration: "7 min read",
      category: "blog",
      author: "James Wilson",
      image: "📊"
    }
  ];

  const videos: Resource[] = [
    {
      title: "QuizForge Demo: PDF to Quiz in 60 Seconds",
      description: "Watch how easy it is to transform any study material into an interactive quiz",
      duration: "1:30",
      category: "video",
      author: "QuizForge Team",
      image: "🎥"
    },
    {
      title: "Pro Tips: Maximizing Your Quiz Quality",
      description: "Advanced techniques for creating more engaging and effective quizzes",
      duration: "8:45",
      category: "video",
      author: "Education Expert",
      image: "💡"
    },
    {
      title: "Team Collaboration Features Walkthrough",
      description: "Learn how to share quizzes and collaborate with your team or students",
      duration: "5:20",
      category: "video",
      author: "Product Team",
      image: "👥"
    }
  ];

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What file formats do you support?",
          a: "We currently support PDF files. Support for Word documents, PowerPoint presentations, and other formats is coming soon."
        },
        {
          q: "How accurate is the AI question generation?",
          a: "Our AI achieves 90%+ accuracy in generating relevant questions. The system continuously learns and improves from user feedback."
        },
        {
          q: "Can I edit the generated questions?",
          a: "Absolutely! You can edit questions, answers, and add your own custom questions to any generated quiz."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "Is there really a free plan?",
          a: "Yes! Our free plan allows 5 PDF uploads per day with basic quiz generation. No credit card required."
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes, you can cancel your subscription at any time. Your plan remains active until the end of your billing period."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied with the service."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          q: "What's the maximum file size for PDFs?",
          a: "Free users can upload files up to 10MB. Pro and Enterprise users can upload files up to 100MB."
        },
        {
          q: "Do you have an API?",
          a: "Yes! API access is available for Enterprise customers. Contact our sales team for more information."
        },
        {
          q: "Is my data secure?",
          a: "Absolutely. We use enterprise-grade encryption and never store your PDF content after processing."
        }
      ]
    }
  ];

  const allResources = [...tutorials, ...blogPosts, ...videos];
  
  const filteredResources = allResources.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.category === activeTab;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'tutorial':
        return <BookOpen className="w-5 h-5" />;
      case 'blog':
        return <User className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative z-10 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Learning{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Tutorials, guides, and tips to help you master quiz creation and get the most out of QuizForge
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'tutorial', label: 'Tutorials' },
              { id: 'blog', label: 'Blog Posts' },
              { id: 'video', label: 'Videos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-900/70 transition-all group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{resource.image}</div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      {getCategoryIcon(resource.category)}
                      <span className="text-sm capitalize">{resource.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{resource.author}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                      {resource.category === 'video' ? (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Watch</span>
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">
              Find answers to common questions about QuizForge
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                    >
                      <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                        <HelpCircle className="w-5 h-5 text-purple-400" />
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-gray-400 leading-relaxed pl-7">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="relative z-10 py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Connect with other users, share tips, and get help from our community
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Discord Community</h3>
              <p className="text-gray-400 mb-6">
                Join our Discord server for real-time discussions and support
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 mx-auto">
                <span>Join Discord</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Download className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Resource Downloads</h3>
              <p className="text-gray-400 mb-6">
                Get free templates, guides, and educational materials
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 mx-auto">
                <span>Download Pack</span>
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;