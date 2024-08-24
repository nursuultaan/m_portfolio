import { useState, useEffect } from 'react';

// Hook to detect screen size
const useScreenSize = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        // Function to handle screen resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export default useScreenSize;
