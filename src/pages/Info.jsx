
import './Info.css'
import './ModalInfo.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { translations } from "../translations/translations";

import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react';

export function Info({language, setLanguage}) {

    const [modalType, setModalType] = useState(null)
    const modalContent = {
        terms: {
            title: translations[language].infoPage.termTitle,
            content: translations[language].infoPage.termsContent
        },
        privacy: {
            title: translations[language].infoPage.privacyTitle,
            content: translations[language].infoPage.privacyContent
        }
    }
    const content = modalType ? modalContent[modalType] : null;

    return(
        <>
            <PageHeader language={language} setLanguage={setLanguage} />
            <main className="page-info in-view">
                <section className="section_page-info">
                    <div className="col_texts">
                        <div className="content-top_page-info">
                            <div className="content-header_info blur-in delay-1">
                                <span>{translations[language].infoPage.titleHeader}</span>
                                <span className="line_page-info"></span>
                            </div>
                            <h1 className='blur-in delay-2'>{translations[language].infoPage.title}</h1>
                        </div>

                        <div className="info-policy-links">
                            <div className="policy-link_item fade-left delay-3">
                                <span className="item_text-policy">{translations[language].infoPage.termTitle}</span>
                                <button 
                                    className="item_btn-policy"  
                                    onClick={() => setModalType("terms")}
                                >
                                    <ArrowRight color="#F2F1EA" />
                                </button>
                            </div>
                            <div className="policy-link_item fade-left delay-4">
                                <span className="item_text-policy">{translations[language].infoPage.privacyTitle}</span>
                                <button 
                                    className="item_btn-policy"  
                                    onClick={() => setModalType("privacy")}
                                >
                                    <ArrowRight color="#F2F1EA" />
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="col-info blur-in delay-5">
                        <div className="info-item fade-left delay-6">
                            <span className="info-item_block-number">01</span>

                            <div className="info-item_block-texts">
                                <span className="block_title-info">
                                    {translations[language].infoPage.infoTitleOne}
                                </span>
                                <span className="block_text-info">
                                    {translations[language].infoPage.infoTextOne}
                                </span>
                            </div>
                        </div>
                        <div className="info-item fade-left delay-7">
                            <span className="info-item_block-number">02</span>

                            <div className="info-item_block-texts">
                                <span className="block_title-info">
                                    {translations[language].infoPage.infoTitleTwo}
                                </span>
                                <span className="block_text-info">
                                    Single Page Application (SPA / Web 2.0)
                                </span>
                            </div>
                        </div>
                        <div className="info-item fade-left delay-8">
                            <span className="info-item_block-number">03</span>

                            <div className="info-item_block-texts">
                                <span className="block_title-info">
                                    {translations[language].infoPage.infoTitleThree}
                                </span>
                                <span className="block_text-info">
                                    React - HTML5 - CSS3 - JavaScript
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {content && (
                    <div className="modal_policy" onClick={() => setModalType(null)}>

                        <div className="modal_content-policy" onClick={(e) => e.stopPropagation()}>
                            <div className="modal_header-policy">
                                <h2>{content.title}</h2>
                                <button onClick={() => setModalType(null)}>
                                    <X color="#F2F1EA" />
                                </button>
                            </div>

                            <div className="modal_content-texts">
                                <p>{content.content.intro}</p>

                                {content.content.items.map((item) =>(
                                        <div key={item.title}>
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </>
    );
}