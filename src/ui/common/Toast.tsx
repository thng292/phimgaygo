import { FC } from "react";

const Toast: FC<{
    title: string,
}> = ({ title }) => {
    return <div className="tshadow p10">
        {title}
    </div>
}