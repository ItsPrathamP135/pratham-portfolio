import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="mx-auto">
      <div className="text-center mb-6">
        <h1 className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome to Code in Transit
        </h1>
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Master the concepts slowly and steadily
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DSA Card */}
        <div
          onClick={() => navigate('/dsa')}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border-2 rounded-2xl p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-103`}
        >
          <div className="text-6xl mb-4">💻</div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
            Data Structures & Algorithms
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore sorting algorithms, tree structures, and graph algorithms with interactive visualizations.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-teal-100 text-teal-700'}`}>
              Sorting
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-teal-100 text-teal-700'}`}>
              Trees
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-teal-100 text-teal-700'}`}>
              Graphs
            </span>
          </div>
        </div>

        {/* Notes Card */}
        <div
          onClick={() => navigate('/notes')}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border-2 rounded-2xl p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-103`}
        >
          <div className="text-6xl mb-4">📝</div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
            Notes
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Keep track of your learning journey with organized notes and quick references.
          </p>
          <div className="mt-4">
            <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'}`}>
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;