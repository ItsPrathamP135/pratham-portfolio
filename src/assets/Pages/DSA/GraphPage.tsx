import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';


interface GraphAlgorithm {
  id: string;
  name: string;
  type: string;
}

const GraphsPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const algorithms: GraphAlgorithm[] = [
    { id: 'bfs-dfs', name: 'BFS & DFS', type: 'Traversal' },
    { id: 'dijkstra', name: "Dijkstra's Algorithm", type: 'Shortest Path' },
    { id: 'kruskal', name: "Kruskal's Algorithm", type: 'MST' },
    { id: 'prim', name: "Prim's Algorithm", type: 'MST' },
    { id: 'floyd-warshall', name: 'Floyd-Warshall', type: 'All Pairs' },
    { id: 'bellman-ford', name: 'Bellman-Ford', type: 'Shortest Path' }
  ];

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
        🕸️ Graph Algorithms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            onClick={() => navigate(`/pratham-portfolio/dsa/graphs/${algo.id}`)}
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-2 rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
          >
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {algo.name}
            </h3>
            <span className={`px-3 py-1 rounded text-sm ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'
            }`}>
              {algo.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphsPage;