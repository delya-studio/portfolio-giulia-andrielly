
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {ChevronRight, ArrowRight, ChevronLeft, Expand, Shrink } from 'lucide-react'

import './ProjectPage.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import projects from '../data/project.json'
import { translations } from '../translations/translations'
import { createPortal } from 'react-dom';

export function ProjectPage({language, setLanguage}){
    const [imageOpen, setImageOpen] = useState(null);
    
    
    const { id } = useParams()
    const project = projects.find((p) => String(p.id) === id)

    const index = projects.findIndex((p) => String(p.id) === id)
    const prev = projects[index - 1]
    const next = projects[index + 1]

    const [prevIndex, setPrevIndex] = useState(index);
    const [direction, setDirection] = useState(null);

    const navigate = useNavigate()
    const [leaving, setLeaving] = useState(null)   // 'next', 'prev' ou null
    const timer = useRef(null)

    useEffect(() => () => clearTimeout(timer.current), [])

    function goTo(e, target, dir) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        if (leaving) return

        setLeaving(dir)
        timer.current = setTimeout(() => navigate(`/projeto/${target.id}`), 280)
    }

    const images = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', {
        eager: true,
        import: 'default',
    })

    function getImage(name) {
        if (!name) return null
        if (name.startsWith('http')) return name   // continua aceitando link
        return images[`../assets/${name}`]
    }

    if (!project) {
        return <h1>Projeto não encontrado.</h1>;
    }

    const content = translations[language].projects.items[project.id]

    if (!content) {
        return <p>Conteúdo do projeto não encontrado.</p>;
    }


    if (index !== prevIndex) {
        setPrevIndex(index)
        setDirection(index > prevIndex ? 'next' : 'prev')
        setLeaving(null)
    }

    const pageClass = [
        'project_page',
        'in-view',
        direction && `nav-${direction}`,
        leaving && `leaving-${leaving}`,
    ].filter(Boolean).join(' ')


    return(
        <>
            <PageHeader language={language} setLanguage={setLanguage} />
            <main key={id} className={pageClass}> 
                <section className='section-project_page'>
                    <div className="lineOne-project_page">
                        <div className="col-left">
                            <div className="number-wrapper blur-in delay-2">
                                <span className="number-project">{project.number}</span>
                            </div>
                            {project.links?.length > 0 && (
                                <div className="project-links">
                                    {project.links.map((link) => (
                                        <div className="content-buttom-project blur-in delay-3" key={link.type}>
                                            <span>
                                                {translations[language].projectPage.links[link.type] ?? link.type}
                                            </span>
                                            <a href={link.url} target="_blank" rel="noreferrer" className="bt">
                                                <ArrowRight color="#F2F1EA" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="col-texts">
                            <h1 className='blur-in delay-4'>{content.title}</h1>
                            <p className="blur-in delay-5">{content.description}</p>
                        </div>

                        <div className="col-meta blur-in delay-6">
                            <div className=" project-meta__item fade-left delay-8">
                                <span className='project-meta__label '>{translations[language].projectPage.metaTools}</span>
                                <span className="project-meta__value">
                                    {content.tools.join(" • ")}
                                </span>
                            </div>
                            <span className='line-meta blur-in delay-7'></span>
                            <div className=" project-meta__item fade-left delay-9">
                                <span className='project-meta__label'>Status</span>
                                <span className="project-meta__value">{content.status}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lineTwo-project_page">
                        <div className="detail-wrapper blur-in delay-8">
                            <img 
                                src={getImage(project.image)} 
                                alt="Image the project" 
                            />
                            <span 
                                className="icon-expand"
                                onClick={() => setImageOpen(getImage(project.image))}
                            >
                                <Expand color="#F2F1EA" />
                            </span>
                        </div>

                        <div className="btn-view-projects blur-in delay-9">
                            {prev ?(
                                <Link to={`/projeto/${prev.id}`} className='btn-prev' onClick={(e) => goTo(e, prev, 'prev')}>
                                    <ChevronLeft /> {translations[language].projectPage.prev}
                                </Link>
                            ):(
                                <span className='btn-prev disabled' aria-disabled='true'>
                                    <ChevronLeft /> {translations[language].projectPage.prev}
                                </span  >
                            )}

                            {next ?(
                                <Link to={`/projeto/${next.id}`} className='btn-next' onClick={(e) => goTo(e, next, 'next')}>
                                    <ChevronRight /> {translations[language].projectPage.next}
                                </Link>
                            ):(
                                <span className='btn-next disabled' aria-disabled='true'>
                                    <ChevronRight /> {translations[language].projectPage.next}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {imageOpen &&
                    createPortal(
                        <div 
                        className="modal-img"
                        onClick={() => setImageOpen(null)}
                        >

                            <button 
                                className="modal-close"
                                onClick={() => setImageOpen(null)}
                            >
                                <Shrink  color="#F2F1EA"/>
                            </button>

                            <div 
                                className="modal-wrapper"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={imageOpen} />
                            </div>
                        </div>,
                        document.body
                    )
                }
            </main>
        </>
    );
}