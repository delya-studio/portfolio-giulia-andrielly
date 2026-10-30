
import './Contact.css'

import { useState } from 'react'
import { FeedbackModal } from '../../components/FeedbackModal/FeedbackModal'

import { translations } from '../../translations/translations';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'

export function Contact({language}){
    const text = translations[language].contact;

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')
    const [emailError, setEmailError] = useState('')

    
    function handleChange (e){
        const {name ,value} =e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)

        if (!emailValido) {
            setEmailError(text.invalidEmail)
            return
        }

        setEmailError('')
    
        setStatus('sending')

        try {
            const body = new FormData()
            // body.append('access_key', 'chave-errada') teste de erro
            body.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)
            body.append('subject', `Nova mensagem de ${formData.name} pelo portfólio`)
            body.append('from_name', 'Portfólio Giulia')
            body.append('replyto', formData.email)
            body.append('Nome', formData.name)
            body.append('Email', formData.email)
            body.append('Mensagem', formData.message)

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body
            })
            const data = await response.json()

            if (data.success) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return(
        <section id="contato" className="section-contact">
            <div className='contact-container'>
                <div className="colunm-left">
                    <div className="colunm-text pagination-project">
                        <div className="content-header-contact blur-in delay-1">
                            <span>{translations[language].contact.title}</span>
                            <span className="line-contact"></span>
                        </div>
                        <p className='blur-in delay-2'>{translations[language].contact.description}</p>
                    </div>

                    <div className="content-links_sociais">
                        <div className="links_sociais fade-left delay-3">
                            <FaWhatsapp color="#F2F1EA" />
                            <a href=" https://wa.me/5541987981860" className='icon-redes'>
                                <ArrowRight color="#F2F1EA" />
                            </a>
                        </div>
                        <div className="links_sociais fade-left delay-3">
                            <FaLinkedinIn color="#F2F1EA"/>
                            <a href="https://www.linkedin.com/in/giulia-andrielly-oliveira-duarte-de-liz-182928282/" className='icon-redes'>
                                <ArrowRight color="#F2F1EA" />
                            </a>
                        </div>
                        <div className="links_sociais fade-left delay-4">
                            <FaGithub color="#F2F1EA"/>
                            <a href="https://github.com/delya-studio" className='icon-redes'>
                                <ArrowRight color="#F2F1EA" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="colunm-right">
                    <form className="contact-form blur-in delay-5" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name"> {text.labelName} </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder={text.namePlaceholder}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email"> E-mail </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={text.emailPlaceholder}
                            />
                            {emailError && <span className="field-error">{emailError}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message"> {text.labelMsg} </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder={text.messagePlaceholder}
                                rows="6"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="contact-submit-btn"
                            disabled={status === 'sending'}
                        >
                            {text.button}
                        </button>
                    </form>
                </div>
            </div>

            {(status === 'success' || status === 'error') && (
                <FeedbackModal
                    type={status}
                    title={text[`${status}Title`]}
                    message={text[`${status}Message`]}
                    onClose={() => setStatus('idle')}
                />
            )}
        </section>
    );

}