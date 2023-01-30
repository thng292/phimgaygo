import { useEffect, useState } from "react";
import CalcWindowSize, { WINDOW_SIZE } from "./windowSize";

/*
 * Small -> 2
 * Medium -> 3
 * Big -> 4
 * Bigger -> 5
 * Extended -> 400px
 * */

interface CalculateWidthProps {
    padding: number;
    gap: number;
}

export default function CalculateWidth({
    padding = 16,
    gap = 8,
}: Partial<CalculateWidthProps> = {}) {
    const [width, changeWidth] = useState(
        calc(padding, gap)
    );
    useEffect(() => {
        const tmp = () => {
            console.log(window.innerWidth, calc(padding, gap))
            changeWidth(calc(padding, gap))
        };
        window.addEventListener("resize", tmp);
        return () => {
            window.removeEventListener("resize", tmp);
        };
    }, []);
    return width;
}

function calc(
    padding: number,
    gap: number,
): number {
    const ws = CalcWindowSize()
    const availSpace = window.innerWidth - padding * 2
    switch (ws) {
        case WINDOW_SIZE.SMALL:     return (availSpace - gap * 2) / 3
        case WINDOW_SIZE.MEDIUM:    return (availSpace - gap * 2) / 3
        case WINDOW_SIZE.BIG:       return (availSpace - gap * 2) / 3
        case WINDOW_SIZE.BIGGER:    return (availSpace - gap * 3) / 4
        case WINDOW_SIZE.EXTENDED: {
            const maxWidth = 320
            let result = 0
            let col = 1
            do {
                result = (availSpace - (col - 1) * gap) / col++
            } while (result > maxWidth)
            return result
        }
    }
}
