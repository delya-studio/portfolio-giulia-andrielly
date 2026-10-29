import './Skills.css'

export function Skills() {
    const skills = [
        'HTML',
        'CSS',
        'JAVASCRIPT',
        'REACT',
        'WORDPRESS',
        'ELEMENTOR',
        'FIGMA',
        'GIT'
    ];

    return (
        <div className="skills">
            <div className="skills-track">

                <div className="skills-list">
                    {skills.map((skill) => (
                        <span key={skill}>
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="skills-list" aria-hidden="true">
                    {skills.map((skill) => (
                        <span key={`duplicate-1-${skill}`}>
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="skills-list" aria-hidden="true">
                    {skills.map((skill) => (
                        <span key={`duplicate-2-${skill}`}>
                            {skill}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
}