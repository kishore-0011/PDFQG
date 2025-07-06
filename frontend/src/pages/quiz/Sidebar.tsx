import React, { useState } from 'react';
import { History, Search, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import type { QuizHistoryItem } from '../QuizInputPage';
import { PanelLeft, PanelRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: QuizHistoryItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, history }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQuizClick = (id: string) => {
    navigate(`/quiz/${id}`);
    onClose();
  };

  const filteredHistory = history.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Shrink to a minimal width and hide all content except the toggle when collapsed
  // Reduce sidebar width for a more compact look
  const sidebarWidth = isExpanded ? 'w-64' : 'w-14';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-full ${sidebarWidth} bg-gray-900/70 backdrop-blur-xl border-r border-gray-800/50
          transform transition-transform duration-300 z-50 overflow-hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* When collapsed, show only the toggle button centered vertically */}
        {!isExpanded ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end" style={{ height: '72px', paddingRight: '1.5rem', paddingTop: '1.5rem' }}>
              <button
                onClick={() => setIsExpanded(true)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelRight size={22} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <Link to="/" onClick={onClose}>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PDFQG
                </h1>
              </Link>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-white transition-colors ml-auto"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                  style={{ marginRight: 0 }}
                >
                  <PanelLeft size={22} />
                </button>
                <button
                  onClick={onClose}
                  className="lg:hidden text-gray-400 hover:text-white transition-colors"
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation + Search */}
            <nav className="flex-grow flex flex-col min-h-0">
              <div className="flex-shrink-0">
                <h2 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <History size={16} /> Quizzes
                </h2>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Find your quiz..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800/50 border border-transparent focus:border-purple-500 focus:ring-purple-500/30 focus:ring-1 text-gray-300 rounded-lg pl-10 pr-10 py-2 transition-all duration-200 placeholder-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Quiz List */}
              <div
                className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-1"
                style={{ overflowX: 'hidden' }}
              >
                <div className="space-y-2">
                  {history.length > 0 && filteredHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm px-3 py-2">No results found.</p>
                  ) : history.length === 0 ? (
                    <p className="text-gray-500 text-sm px-3 py-2">No quizzes yet.</p>
                  ) : (
                    filteredHistory.map((quiz) => (
                      <button
                        key={quiz.id}
                        onClick={() => handleQuizClick(quiz.id)}
                        className="block text-left w-full px-3 py-2 bg-gray-800/40 text-gray-300 hover:bg-gray-700/50 rounded transition-all"
                      >
                        <span className="truncate">{quiz.title}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
