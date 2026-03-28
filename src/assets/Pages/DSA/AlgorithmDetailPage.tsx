import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';


const AlgorithmDetailPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const params = useParams<{ algorithmId?: string; treeId?: string }>();

  const algorithmName = (params.algorithmId || params.treeId || '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 px-4 py-2 rounded-lg ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        } hover:opacity-80 transition-opacity`}
      >
        ← Back
      </button>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
          {algorithmName}
        </h2>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Content coming soon! This will include visualization, code implementation, and explanations.
        </p>
      </div>
    </div>
  );
};

export default AlgorithmDetailPage;