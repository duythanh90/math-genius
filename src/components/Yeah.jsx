import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export const Yeah = ({ open }) => {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (open) {
            setShowConfetti(true);
            const timeout = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    return <>{showConfetti && <Confetti
        gravity={0.7} wind={0.1} width={width} height={height} />}</>;
};
