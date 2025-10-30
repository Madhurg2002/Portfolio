import { useEffect, useRef, useCallback } from 'react';

// Define the type for the element reference, which is an HTMLDivElement for our cards
type CardRef = HTMLDivElement | null;
type CardRefs = React.RefObject<CardRef[]>;

// Hook to integrate 3D tilt effect on multiple cards
export const useTiltEffect = (maxTilt: number = 8, maxShadow: number = 12): CardRefs => {
    const cardRefs = useRef<CardRef[]>([]);

    const handleMouseMove = useCallback((e: MouseEvent, card: HTMLDivElement) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / centerX;
        const rotateX = (y - centerY) / centerY;

        const transformStyle = `perspective(1000px) rotateX(${-rotateX * maxTilt}deg) rotateY(${rotateY * maxTilt}deg) scale(1.01)`;
        card.style.transform = transformStyle;

        const shadowX = -rotateY * maxShadow * 0.5;
        const shadowY = -rotateX * maxShadow * 0.5;
        const shadowStyle = `0 0 ${maxShadow * 2}px rgba(52, 211, 163, 0.4)`;
        card.style.boxShadow = `${shadowX}px ${shadowY}px ${maxShadow}px rgba(0, 0, 0, 0.8), ${shadowStyle}`;
        card.style.borderColor = '#10B981';
    }, [maxTilt, maxShadow]);

    const handleMouseLeave = useCallback((card: HTMLDivElement) => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = 'none';
        card.style.borderColor = 'transparent';
    }, []);

    useEffect(() => {
        // Filter out null/undefined refs and assert type
        const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);

        const listeners = cards.map(card => {
            const moveHandler = (e: MouseEvent) => handleMouseMove(e, card);
            const leaveHandler = () => handleMouseLeave(card);

            card.addEventListener('mousemove', moveHandler as EventListener);
            card.addEventListener('mouseleave', leaveHandler as EventListener);
            return { card, moveHandler, leaveHandler };
        });

        return () => {
            listeners.forEach(({ card, moveHandler, leaveHandler }) => {
                card.removeEventListener('mousemove', moveHandler as EventListener);
                card.removeEventListener('mouseleave', leaveHandler as EventListener);
            });
        };
    }, [handleMouseMove, handleMouseLeave]);

    return cardRefs;
};
