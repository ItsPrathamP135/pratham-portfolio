import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useTheme } from '../../Context/ThemeContext';

const Layout  = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-teal-50 via-purple-50 to-blue-50'
    }`}>
      <Header />
      <main className="p-5 min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;