import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';


interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  topics: string[];
}

const DSAPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const modules: Module[] = [
    {
      id: 'sorting',
      name: 'Sorting Algorithms',
      icon: '🔢',
      description: 'Learn and visualize various sorting techniques',
      topics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort']
    },
    {
      id: 'trees',
      name: 'Tree Structures',
      icon: '🌳',
      description: 'Master hierarchical data structures',
      topics: ['Binary Tree', 'BST', 'AVL Tree', 'Red-Black Tree']
    },
    {
      id: 'graphs',
      name: 'Graph Algorithms',
      icon: '🕸️',
      description: 'Explore graph traversal and algorithms',
      topics: ['BFS & DFS', 'Dijkstra', 'Kruskal', 'Prim']
    }
  ];

  return (
    <div className="mx-auto">
      <h2 className={`text-4xl font-bold mb-4 mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Data Structures & Algorithms
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => navigate(`/dsa/${module.id}`)}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-2 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
          >
            <div className="text-5xl mb-4">{module.icon}</div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {module.name}
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {module.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {module.topics.map((topic) => (
                <span
                  key={topic}
                  className={`text-xs px-2 py-1 rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-teal-50 text-teal-700'
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DSAPage;