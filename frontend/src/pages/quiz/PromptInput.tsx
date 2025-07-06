import React from 'react';

interface PromptInputProps {
  prompt: string;
  questionCount: number;
  difficulty: string;
  onChange: (field: string, value: string | number) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  questionCount, 
  difficulty, 
  onChange 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter your topic or question prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => onChange('prompt', e.target.value)}
          placeholder="e.g., Create questions about World War II, focusing on major battles and key figures..."
          className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Questions
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={questionCount}
            onChange={(e) => onChange('questionCount', parseInt(e.target.value) || 10)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => onChange('difficulty', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
