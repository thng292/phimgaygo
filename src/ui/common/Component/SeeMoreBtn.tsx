import {FC} from "react";

const SeeMoreBtn: FC<{
    onClick: () => void,
}> = ({onClick}) => {
    return <button className="bg-gray-800 cursor-pointer rounded-full p-2 px-4"
                   onClick={onClick}>
        <h2>See More</h2>
    </button>
}

export default SeeMoreBtn;