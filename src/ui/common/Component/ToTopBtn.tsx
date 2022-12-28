import SVG_ArrowUpward from "../SVG/SVG_ArrowUpward";

export default function ToTopBtn() {
    return <button
        className="bg-main-1000 rounded-full"
        style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: 'auto',
            padding: '15px 20px'
        }}
        onClick={() => window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })}
    >
        {SVG_ArrowUpward()}
    </button>
}