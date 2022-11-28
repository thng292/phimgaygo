import { FC } from "react";

const SeeMoreBtn: FC<{
    onClick: () => void,
    isLoading: boolean,
}> = ({ isLoading, onClick }) => {
    return <button className="tbutton"
        onClick={onClick}>
        <h2>{isLoading ? "Loading..." : "More..."}</h2>
    </button>
    }

export default SeeMoreBtn;