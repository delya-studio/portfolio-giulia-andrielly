import { useState } from 'react';
import projects from '../../data/project.json'; 
import { translations } from '../../translations/translations';
import { Card } from './ProjectCard/Card';
{/*import projectsData from '../../data/project.json'; */}

import { ChevronLeft, ChevronRight } from 'lucide-react'

import './Projects.css';

export function Projects({ language}) {

    const [activeCard, setActiveCard] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const text = translations[language].projects;

    {/* Paginação */}
    const projectPage = 6;

    {/*const projects = Array.from({ length: 34 }, (_, i) => projectsData[i % projectsData.length]);*/}

    const totalPages = Math.max(1, Math.ceil(projects.length / projectPage));

    const safePage = Math.min(currentPage, totalPages);

    const lastProjectIndex = safePage * projectPage;
    const firstProjectIndex = lastProjectIndex - projectPage;

    const currentProjects = projects.slice(firstProjectIndex, lastProjectIndex);

    const pages = generatePages(safePage, totalPages);

    function generatePages(currentPage, totalPages) {
        if (totalPages <= 4) {
            return Array.from(
                { length: totalPages },
                (_, i) => i + 1
            );
        }

        if (currentPage <= 2) {
            return [1, 2, 3, "...", totalPages];
        }

        if (currentPage === 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        if (currentPage === totalPages - 2) {
            return [
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
            ];
        }

        if (currentPage >= totalPages - 1) {
            return [
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages
            ];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        ];
    }
    

    return (
        <section id='projetos' className="section-projects">

            <div className="projects-container">
                <div className="content-header-project blur-in delay-1">
                        <span>{translations[language].projects.title}</span>
                        <span className="line-project"></span>
                </div>

                <div className="projects-cards blur-in">
                    {currentProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            project={project}
                            text={text}
                            isActive={activeCard === index}
                            onClick={() => setActiveCard(index)}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-project blur-in delay-6">
                        
                        <button
                            className="chevron"
                            onClick={() => setCurrentPage(safePage - 1)}
                            disabled={safePage === 1}
                        >
                            <ChevronLeft />
                        </button>

                        {pages.map((page, index) => {
                            if (page === "...") {
                                return <span key={index}  className="pagination-dots" aria-hidden="true">...</span>;
                            } else {
                                return (
                                    <button 
                                        className={`number-pagination ${page === currentPage ? 'active' : ''}`}
                                        key={index}  
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            }
                        })}

                        <button
                            className="chevron"
                            onClick={() => setCurrentPage(safePage + 1)}
                            disabled={safePage === totalPages}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}
            </div>

        </section>
    );
}