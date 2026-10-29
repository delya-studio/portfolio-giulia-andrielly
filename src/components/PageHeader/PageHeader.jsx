
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';

import './PageHeader.css'
import { translations } from "../../translations/translations";


export function PageHeader({language, setLanguage}){
    return(
        <header className="page-header in-view">
            <div className="container-headerPage blur-in delay-1">
                <div className="btn-voltar">
                    <Link
                        to="/" 
                        className='icon-text'
                    >
                        <ArrowLeft /> 
                        <span>{translations[language].headerPage.back}</span>
                    </Link>
                </div>

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
            </div>
        </header>
    );
}