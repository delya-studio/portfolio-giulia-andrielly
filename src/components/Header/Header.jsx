import { useEffect, useState, useRef } from "react";
import { TextAlignStart, X, Info } from "lucide-react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import { translations } from "../../translations/translations";

export function Header({
    isMenuOpen,
    setIsMenuOpen,
    language,
    setLanguage
}) {
    const [activeSection, setActiveSection] = useState("home");
    const scrollTravado = useRef(false);
    const headerRef = useRef(null);

    const handleSectionClick = (id) => {
        const container = document.querySelector(".glass-page");
        const section = document.getElementById(id);

        if (!container || !section) return;

        // só reinicia a animação se a seção ainda não está bem visível
        const c = container.getBoundingClientRect();
        const s = section.getBoundingClientRect();
        const visible = Math.min(s.bottom, c.bottom) - Math.max(s.top, c.top);
        const jaVisivel = visible / Math.min(s.height, c.height) >= 0.3;

        if (!jaVisivel) section.classList.remove("in-view");

        scrollTravado.current = true;
        setActiveSection(id);
        setIsMenuOpen(false);

        let position = 0;

        if (id !== "home") {
            position = s.top - c.top + container.scrollTop;
        }

        container.scrollTo({ top: position, behavior: "smooth" });

        // libera o travamento quando a rolagem parar
        let timer;
        const finish = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                container.removeEventListener("scroll", finish);
                scrollTravado.current = false;
            }, 120);
        };

        container.addEventListener("scroll", finish);
        finish();
    };

    // Mede a altura real do header e guarda como variável CSS,
    // pra usarmos no clip-path do <main>
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const updateHeaderHeight = () => {
            const height = header.getBoundingClientRect().height;
            document.documentElement.style.setProperty(
                "--header-height",
                `${height}px`
            );
        };

        updateHeaderHeight();

        const resizeObserver = new ResizeObserver(updateHeaderHeight);
        resizeObserver.observe(header);

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const container = document.querySelector(".glass-page");
        if (!container) return;

        const sections = [
            ...container.querySelectorAll("section[id]")
        ];

        const updateActiveSection = () => {
            if (scrollTravado.current) return;

            const containerRect = container.getBoundingClientRect();
            const marker = containerRect.top + container.clientHeight * 0.3;

            let currentSection = "home";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= marker) {
                    currentSection = section.id;
                }
            });

            if (container.scrollTop <= 10) {
                currentSection = "home";
            }

            setActiveSection(currentSection);
        };

        container.addEventListener("scroll", updateActiveSection);

        return () => {
            container.removeEventListener("scroll", updateActiveSection);
        };
    }, []);

    return (
        <header ref={headerRef}>
            <div className="container-header">

                <nav className="nav-menu">
                    <a
                        href="#home"
                        className={activeSection === "home" ? "active" : ""}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSectionClick("home");
                        }}
                    >
                        {translations[language].nav.home}
                    </a>

                    <a
                        href="#projetos"
                        className={activeSection === "projetos" ? "active" : ""}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSectionClick("projetos");
                        }}
                    >
                        {translations[language].nav.projects}
                    </a>

                    <a
                        href="#contato"
                        className={activeSection === "contato" ? "active" : ""}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSectionClick("contato");
                        }}
                    >
                        {translations[language].nav.contact}
                    </a>
                </nav>

                <div className="menu-lateral">
                    <div className="language">
                        <button
                            className={language === "pt-BR" ? "active" : ""}
                            onClick={() => setLanguage("pt-BR")}
                        >
                            PT-BR
                        </button>
                        <button
                            className={language === "en" ? "active" : ""}
                            onClick={() => setLanguage("en")}
                        >
                            EN
                        </button>
                    </div>

                    <NavLink to="/info" className="info">
                        <Info />
                        <span className="info-text">Info</span>
                    </NavLink>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <TextAlignStart />}
                </button>

                {isMenuOpen && (
                    <div className="mobile-menu">
                        <filter id="glass-filter-_r_b_" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">
                            <div>
                                <a
                                    href="#home"
                                    className={activeSection === "home" ? "mobile-text active" : "mobile-text"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSectionClick("home");
                                    }}
                                >
                                    {translations[language].nav.home}
                                </a>

                                <a
                                    href="#projetos"
                                    className={activeSection === "projetos" ? "mobile-text active" : "mobile-text"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSectionClick("projetos");
                                    }}
                                >
                                    {translations[language].nav.projects}
                                </a>

                                <a
                                    href="#contato"
                                    className={activeSection === "contato" ? "mobile-text active" : "mobile-text"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSectionClick("contato");
                                    }}
                                >
                                    {translations[language].nav.contact}
                                </a>

                                <NavLink
                                    to="/info"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? "mobile-text active" : "mobile-text"
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Info
                                </NavLink>
                            </div>
                        </filter>
                    </div>
                )}
            </div>
        </header>
    );
}