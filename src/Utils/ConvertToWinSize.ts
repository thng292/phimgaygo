import WindowSize from "./windowSize";

export default function convertToWinSize(length: number): WindowSize {
    if (length > 1200) return WindowSize.EXTENDED
    if (length > 992) return WindowSize.BIG
    if (length > 768) return WindowSize.MEDIUM
    return WindowSize.SMALL
}

// export default function useWindowSize() {
//     if (typeof window !== "undefined") {
//         return { width: WindowSize.BIG, height: WindowSize.MEDIUM };
//     }
//     const [windowSize, setWindowSize] = React.useState({
//         width: WindowSize.MEDIUM,
//         height: WindowSize.MEDIUM,
//     });

//     React.useEffect(() => {
//         window.addEventListener("resize", () => {
//             setWindowSize(oldVal => {
//                 //console.log({
//                     width: convertSize(window.innerWidth), height: convertSize(window.innerHeight)
//                 })
//                 return {
//                     width: convertSize(window.innerWidth), height: convertSize(window.innerHeight)
//                 }
//             });
//         });
//         return () => window.removeEventListener("resize", () => {
//             setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//         });
//     }, []);
//     return windowSize
// }