import {FC} from "react";

const SeeMoreBtn: FC<{ onClick: () => void; text: string }> = ({
    onClick,
    text,
}) => {
    return (
        <div
            className={
                "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30"
            }
        >
            <button
                className='bg-gray-800 cursor-pointer rounded-full p-2 px-4 w-max'
                onClick={onClick}
            >
                <h2>{text}</h2>
            </button>
        </div>
    );
};

export default SeeMoreBtn;