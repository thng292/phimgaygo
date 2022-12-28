import {FC} from "react";

const IconAndLabelWrap: FC<{
    icon: JSX.Element,
    label: string,
}> = (props) => {
    return <div className={'flex overflow-x-hidden'}>
        {props.icon}
        <p className={'text-black px-2'}>{props.label}</p>
    </div>
}

export default IconAndLabelWrap