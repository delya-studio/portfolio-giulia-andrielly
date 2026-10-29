import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import { Background } from './components/Background/Background'
import { Splash } from './components/Splash/Splash'
import { GlassPage } from './components/GlassPage/GlassPage'
import { Header } from './components/Header/Header'

import { Info } from './pages/Info'
import { ProjectPage } from './pages/ProjectPage'

import { Home } from './sections/Home/Home'
import { Projects } from './sections/Projects/Projects'
import { Contact } from './sections/Contact/Contact'

function App() {

  const [phase, setPhase] = useState('splash')
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('glass'), 3600);
    const t2 = setTimeout(() => setPhase('header'), 4400);

    const t3 = setTimeout(() => {
        setPhase('content');
        setShowSplash(false);
    }, 4800);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
}, []);



  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState(() => {
    const browserLanguage = navigator.language;

    return browserLanguage.startsWith("en")
        ? "en"
        : "pt-BR";
  });

  useEffect(() => {
      document.documentElement.lang =
          language === "en" ? "en" : "pt-BR";
  }, [language]);

  return (
    <div data-phase={phase}>

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        
        {showSplash && <Splash language={language} />}
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Background />

                <GlassPage>
                  

                  <main>
                    <Home language={language} />
                    <Projects language={language} />
                    <Contact language={language} />
                    
                  </main>
                
                </GlassPage>
                <Header
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    language={language}
                    setLanguage={setLanguage}
                />
                
              </>
            }
          />
          <Route
              path="/info"
              element={
                  <Info
                      language={language}
                      setLanguage={setLanguage}
                  />
              }
          />
          <Route
              path="/projeto/:id"
              element={<ProjectPage language={language} setLanguage={setLanguage} />}
          />
        </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App;

