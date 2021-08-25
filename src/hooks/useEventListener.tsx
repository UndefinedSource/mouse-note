import { useEffect, useCallback } from 'react';

export const useEventListener = (eventName: string, func: Function) => {
    const eventHandler = useCallback((e: any): void => {
        func(e);
    }, [func]);

    useEffect(() => {
        window.addEventListener(eventName, eventHandler);
    
        return () => {
            window.removeEventListener(eventName, eventHandler);
        };
    }, [eventName, eventHandler]);
};