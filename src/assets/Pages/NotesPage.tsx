import { useTheme } from "../Context/ThemeContext";


const NotesPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className="">
      <h2 className={`text-4xl font-bold mb-4 mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Notes
      </h2>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your notes will appear here. Start taking notes for your learning journey!
        </p>
      </div>
    </div>
  );
};

export default NotesPage;