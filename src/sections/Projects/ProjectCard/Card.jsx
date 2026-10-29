import './Card.css';

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';

export function Card({
    project,
    text,
    isActive,
    onClick
}) {

    const content = text.items[project.id];

    return (
        <article
            className={`project-card fade-left ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >

          
                <div className={`project-open ${isActive ? 'visible' : ''}`}>
                    <div className="project-open-content">
                        <span className="project-category">
                            {content.category}
                        </span>

                        <h2>{content.title}</h2>

                        <span className="project-tools">
                            {content.tools.join(" • ")}
                        </span>

                        <div className="project-number-wrapper">
                            <span className="project-number">{project.number}</span>
                        </div>

                        
                        <Link to={`/projeto/${project.id}`} className='buttom-project'>
                            {text.viewProject}
                            <ArrowRight color="#F2F1EA" />
                        </Link>
                        
                    </div>
                </div>
            
                <div className={`project-closed ${!isActive ? 'visible' : ''}`}>
                    <span>{content.title}</span>

                    <span className="project-number">
                        {project.number}
                    </span>
                </div>
           

        </article>
    );
}