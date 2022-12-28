import React, { useState, useEffect } from 'react'

export default function useIntersection(element: React.MutableRefObject<HTMLElement | null>, rootMargin: number) {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            }, { rootMargin: String(rootMargin) + 'px' }
        );

        element.current && observer.observe(element.current);

        return () => {
            element.current && observer.unobserve(element.current)
        };
    }, []);

    return isVisible;
};