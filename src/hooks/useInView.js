import { useEffect } from 'react'

export function useInView() {
    useEffect(() => {
        const root = document.querySelector('.glass-page')
        const sections = document.querySelectorAll('section[id]')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= 0.3) {
                        entry.target.classList.add('in-view')
                    }
                })
            },
            { root, threshold: [0, 0.3] }
        )

        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])
}