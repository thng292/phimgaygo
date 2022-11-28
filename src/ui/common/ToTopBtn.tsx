import SVG_ArrowUpward from "./svg/SVG_ArrowUpward";

export default function ToTopBtn() {
    return <button
        className="tbutton"
        style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: 'auto',
            padding: '15px 20px'
        }}
        onClick={() => window.scrollTo(0, 0)}
    >
        <SVG_ArrowUpward />
    </button>
}