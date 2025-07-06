import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';

interface AdvancedSettingsProps {
  questionType: string;
  includeExplanations: boolean;
  language: string;
  onChange: (field: string, value: string | boolean) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  questionType,
  includeExplanations,
  language,
  onChange
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-gray-400" />
          <span className="text-white font-medium">Advanced Settings</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={18} className="text-gray-400" />
        ) : (
          <ChevronRight size={18} className="text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-700/50 mt-2 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => onChange('questionType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="truefalse">True/False</option>
              <option value="fillblanks">Fill in the Blanks</option>
              <option value="mixed">Mixed Types</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeExplanations}
                onChange={(e) => onChange('includeExplanations', e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500/50"
              />
              <span className="text-sm text-gray-300">Include explanations</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};