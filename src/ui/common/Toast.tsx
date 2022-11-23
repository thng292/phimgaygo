import { FC } from "react";

const Toast: FC<{
    title: string,
}> = ({ title }) => {
    return <div className="shadow p10">
        {title}
    </div>
}