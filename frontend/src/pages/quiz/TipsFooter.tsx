import React from 'react';

export const TipsFooter: React.FC = () => {
  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
      <h3 className="text-white font-medium mb-2">💡 Tips for better quizzes:</h3>
      <ul className="text-sm text-gray-400 space-y-1">
        <li>• Be specific about your topic and learning objectives</li>
        <li>• For PDFs, ensure text is clear and readable</li>
        <li>• Use page ranges to focus on specific sections</li>
        <li>• Include context and background information in your prompts</li>
      </ul>
    </div>
  );
};