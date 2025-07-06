import React from 'react';
import { Zap, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ 
  onClick, 
  disabled = false, 
  isLoading = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2 relative overflow-hidden"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-white font-semibold">Creating Quiz...</span>
          </div>
        </div>
      )}
      
      <div className={`flex items-center gap-2 transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Zap size={20} />
        <span>Generate Quiz</span>
      </div>
    </button>
  );
};