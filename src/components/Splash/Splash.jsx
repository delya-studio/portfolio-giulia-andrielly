import { useState } from 'react';
import { translations } from '../../translations/translations';
import './Splash.css';

export function Splash({ language }) {
    const welcome = translations[language].splash.welcome;

    const [LETRAS] = useState(() =>
        welcome.split('').map((letra) => ({
            letra,
            x: Math.random() * 120 - 60,
            y: Math.random() * 120 - 60,
        }))
    );

    return (
        <div className="splash">
            {LETRAS.map(({ letra, x, y }, index) => (
                <span
                    key={index}
                    style={{
                        '--i': index,
                        '--x': `${x}px`,
                        '--y': `${y}px`,
                    }}
                >
                    {letra}
                </span>
            ))}
        </div>
    );
}