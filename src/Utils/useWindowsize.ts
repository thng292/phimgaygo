import React from "react";

export default function useWindowSize() {
    if (typeof window !== "undefined") {
        return {width: 1200, height: 800};
    }

    const [windowSize, setWindowSize] = React.useState({
        width: 1200,
        height: 800,
    });

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        });
        return ()=> window.removeEventListener("resize", () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        });
    }, []);
    return windowSize
}