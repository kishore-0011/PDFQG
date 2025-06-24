import { Sparkles, Users, Cpu, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';
import type { JSX } from 'react';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

interface TechStack {
  name: string;
  description: string;
  icon: JSX.Element;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      bio: "Former ML engineer at Google, passionate about democratizing education through AI."
    },
    {
      name: "Sarah Johnson",
      role: "CTO & Co-founder", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      bio: "PhD in NLP from Stanford, expert in educational technology and AI systems."
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format", 
      bio: "Award-winning UX designer focused on creating intuitive learning experiences."
    }
  ];

  const techStack: TechStack[] = [
    {
      name: "Advanced NLP",
      description: "Natural Language Processing to understand and extract key concepts from documents",
      icon: <Cpu className="w-6 h-6 text-purple-400" />
    },
    {
      name: "GPT Integration",
      description: "Leveraging state-of-the-art language models for intelligent question generation",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />
    },
    {
      name: "Machine Learning",
      description: "Adaptive algorithms that learn from user preferences and improve over time",
      icon: <Users className="w-6 h-6 text-purple-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Our Mission</span>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Democratizing{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              smart studying
            </span>
            <br />
            with AI.
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We believe that quality education should be accessible to everyone. QuizForge transforms 
            how students learn by making quiz creation effortless and intelligent.
          </p>
        </div>

        {/* The Story Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              QuizForge was born from a simple frustration: spending hours creating study materials 
              instead of actually studying. As graduate students, we found ourselves constantly 
              converting lecture notes and textbook chapters into practice questions.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              We realized that this manual process was not only time-consuming but also inefficient. 
              The same challenges faced millions of students worldwide. That's when we decided to 
              leverage the power of AI to solve this problem once and for all.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Today, QuizForge helps thousands of students transform their study materials into 
              interactive quizzes in seconds, not hours. We're just getting started on our mission 
              to revolutionize how the world learns.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember, index: number) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:bg-gray-900/70 transition-all">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Behind QuizForge */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">The Technology Behind QuizForge</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {techStack.map((tech: TechStack, index: number) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{tech.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">hello@quizforge.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">support@quizforge.com</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">For Business Inquiries</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Interested in enterprise solutions or partnerships? We'd love to hear from you.
              </p>
              <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
            <p className="text-gray-400 mb-6">
              Stay updated with our latest features, company news, and educational content.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Twitter</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
              >
                <Github className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
              >
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Blog</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;