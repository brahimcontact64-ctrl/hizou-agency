import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import SocialMediaService from './pages/SocialMediaService';
import VideoService from './pages/VideoService';
import DesignService from './pages/DesignService';
import AllServices from './pages/AllServices';

import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          
          <Header />

          <main className="flex-grow pt-16 md:pt-20">
            <Routes>

              {/* الصفحة الرئيسية */}
              <Route path="/" element={<Home />} />

              {/* صفحة Voir Tous */}
              <Route path="/services" element={<AllServices />} />

              {/* الصفحات الفرعية القديمة */}
              <Route path="/services/social-media" element={<SocialMediaService />} />
              <Route path="/services/video" element={<VideoService />} />
              <Route path="/services/design" element={<DesignService />} />

              {/* صفحة المشاريع الجديدة */}
              <Route path="/projects" element={<ProjectsPage />} />

            </Routes>
          </main>

          <Footer />
        
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;