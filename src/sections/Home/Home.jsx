import './Home.css'
import { translations } from '../../translations/translations';
import { Skills } from './Skills';

import { ArrowRight } from 'lucide-react'

export function Home({language}) {
     

    return(
        <section id="home" className='section-home'>
            <div className="home-container">
                <div className="content-text">
                    <span className='text-sub blur-in delay-1'>{translations[language].home.greeting}</span>
                    <div className="lineOne">
                        <h1 className="title-home blur-in delay-2">{translations[language].home.roleLine1}</h1>
                        <div className="button-content blur-in delay-3">
                            <span className="text-buttom">{translations[language].home.button}</span>
                            <a href="#projetos" className='icon-bt'>
                                <ArrowRight color="#F2F1EA" />
                            </a>
                        </div>
                       
                    </div>

                    <div className="lineTwo">
                        <h1 className="title-home blur-in delay-4">{translations[language].home.roleLine2}</h1>
                        <p className='blur-in delay-5'>{translations[language].home.description}</p>
                    </div>

                    <div className="button-mobile blur-in delay-6">
                            <span className="text-buttom">{translations[language].home.button}</span>
                            <a href="#projetos" className='icon-bt'>
                                <ArrowRight color="#F2F1EA" />
                            </a>
                    </div>
                    
                </div>
                <div className="content-skills blur-in delay-7">
                    {/* carrossel infinito de skill, icones ou texto*/}
                    <Skills/>
                </div>
            </div>
        </section>
    );
}