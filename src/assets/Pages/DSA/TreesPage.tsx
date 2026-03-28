import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';


interface Tree {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const TreesPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const trees: Tree[] = [
    { id: 'binary-tree', name: 'Binary Tree', difficulty: 'Easy' },
    { id: 'bst', name: 'Binary Search Tree', difficulty: 'Medium' },
    { id: 'avl-tree', name: 'AVL Tree', difficulty: 'Hard' },
    { id: 'red-black-tree', name: 'Red-Black Tree', difficulty: 'Hard' },
    { id: 'b-tree', name: 'B-Tree', difficulty: 'Hard' },
    { id: 'segment-tree', name: 'Segment Tree', difficulty: 'Hard' }
  ];

  const getDifficultyStyle = (difficulty: Tree['difficulty']): string => {
    if (difficulty === 'Easy') {
      return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
    } else if (difficulty === 'Medium') {
      return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
    } else {
      return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/dsa')}
        className={`mb-6 px-4 py-2 rounded-lg ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
        } hover:opacity-80 transition-opacity`}
      >
        ← Back to DSA
      </button>

      <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        🌳 Tree Data Structures
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div
            key={tree.id}
            onClick={() => navigate(`/dsa/trees/${tree.id}`)}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-2 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
          >
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {tree.name}
            </h3>
            <span className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyStyle(tree.difficulty)}`}>
              {tree.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreesPage;