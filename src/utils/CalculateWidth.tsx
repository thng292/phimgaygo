import {useEffect, useState} from "react";

function calc(padding: number, gap: number, minWidth: number, maxWidth: number): number {
    let col = 1;
    let res = 0;
    while (true) {
        res = (window.innerWidth - padding * 2 - gap * (col - 1)) / col
        if (res >= maxWidth) {
            col++;
            continue
        }
        return res > minWidth ? Math.floor(res) : minWidth;
    }
}

/*
* Small -> 2
* Medium -> 3
* Big -> 4
* Bigger -> 5
* Extended -> 400px
* */
export default function CalculateWidth(padding: number = 16, gap: number = 8, minWidth: number = 240, maxWidth: number = 320) {
    const [width, changeWidth] = useState(calc(padding, gap, minWidth, maxWidth))
    useEffect(() => {
        const tmp = () => changeWidth(calc(padding, gap, minWidth, maxWidth))
        window.addEventListener('resize', tmp)
        return () => {
            window.removeEventListener('resize', tmp)
        }
    })
    return width
}