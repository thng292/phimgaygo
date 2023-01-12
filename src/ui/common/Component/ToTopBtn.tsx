import { FC } from "react";
import SVG_ArrowUpward from "../SVG/SVG_ArrowUpward";

const ToTopBtn: FC<{show: boolean}> = ({show}) => {
    return <button
        className="bg-main-1000 rounded-full fixed z-50 bottom-8 right-8 p-4 transition-all duration-500"
        style={{
            visibility: show ? "visible" : "hidden",
            opacity: show ? '100%' : '0',
        }}
        onClick={() => window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })}
    >
        <SVG_ArrowUpward/>
    </button>
}

export default ToTopBtn