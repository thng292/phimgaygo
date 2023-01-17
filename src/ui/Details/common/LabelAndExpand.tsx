import { FC } from "react";

const LabelAndExpand: FC<{
    label: string;
    expand: boolean;
    onClick: () => void;
}> = ({ label, expand, onClick }) => {
    return <h2
        onClick={onClick}
        className={
            "group font-bold subpixel-antialiased text-3xl py-4 cursor-pointer"
        }
    >
        {label}
        <span
            className={
                "font-normal text-lg opacity-0 transition-all duration-500 px-2 float-right hidden sm:inline-block group-hover:opacity-100"
            }
        >
            {expand ? "Expand" : "Minimize"}
        </span>
    </h2>;
};

export default LabelAndExpand