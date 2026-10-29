import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './FeedbackModal.css'

export function FeedbackModal({ type, title, message, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose])

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal modal-${type}`}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>{title}</h3>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>,
        document.body
    )
}