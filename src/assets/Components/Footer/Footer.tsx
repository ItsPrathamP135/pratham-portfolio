import { useTheme } from "../../Context/ThemeContext";


const Footer  = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Code in Transit. Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;