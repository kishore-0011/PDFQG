import { Check, Sparkles, Crown, Building, Zap } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';

type PlanColor = 'gray' | 'purple' | 'blue';

interface Plan {
  name: string;
  icon: React.ElementType;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  color: PlanColor;
}

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: Plan[] = [
    {
      name: 'Free',
      icon: Sparkles,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with quiz generation',
      features: [
        '5 PDF uploads per day',
        'Basic MCQ generation',
        'Up to 10 questions per quiz',
        'Standard export (PDF)',
        'Email support',
        'Basic question types',
      ],
      cta: 'Start for Free',
      popular: false,
      color: 'gray',
    },
    {
      name: 'Pro',
      icon: Crown,
      price: { monthly: 19, yearly: 15 },
      description: 'Everything you need for professional quiz creation',
      features: [
        'Unlimited PDF uploads',
        'Advanced AI question generation',
        'Multiple question types (MCQ, T/F, Fill-in-blanks)',
        'All export formats (PDF, CSV, JSON, DOCX)',
        'Priority email support',
        'Custom difficulty levels',
        'Quiz templates',
        'Bulk question editing',
        'Analytics dashboard',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      color: 'purple',
    },
    {
      name: 'Enterprise',
      icon: Building,
      price: { monthly: 99, yearly: 79 },
      description: 'Advanced features for teams and organizations',
      features: [
        'Everything in Pro',
        'Team accounts (up to 50 users)',
        'API access',
        'Priority support & phone calls',
        'Custom integrations',
        'LMS integration',
        'White-label options',
        'Advanced analytics',
        'Custom question templates',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'blue',
    },
  ];

  const getColorClasses = (color: PlanColor) => {
    const colors = {
      gray: {
        border: 'border-gray-700',
        bg: 'bg-gray-900/50',
        icon: 'bg-gray-500/20 text-gray-400',
        cta: 'bg-gray-700 hover:bg-gray-600 text-white',
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-500/5',
        icon: 'bg-purple-500/20 text-purple-400',
        cta: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
      },
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-500/5',
        icon: 'bg-blue-500/20 text-blue-400',
        cta: 'bg-blue-600 hover:bg-blue-700 text-white',
      },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI-powered quiz generation.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`font-medium ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${isYearly ? 'text-white' : 'text-gray-400'}`}>Yearly</span>
              {isYearly && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => {
              const colors = getColorClasses(plan.color);
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={`relative backdrop-blur-sm border rounded-2xl p-6 lg:p-8 hover:transform hover:scale-105 transition-all ${
                    plan.popular ? 'border-purple-500 ring-2 ring-purple-500/20' : colors.border
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.icon}`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-gray-400 mt-2">{plan.description}</p>
                      </div>

                      <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-gray-400 mb-1">
                          {plan.price.monthly === 0 ? 'forever' : '/month'}
                        </span>
                      </div>

                      {isYearly && plan.price.monthly > 0 && (
                        <p className="text-sm text-gray-400">
                          Billed annually ${plan.price.yearly * 12}/year
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${colors.cta}`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
