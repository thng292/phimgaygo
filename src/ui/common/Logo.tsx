import React, { FC } from 'react'

const Logo: FC<{ style?: React.CSSProperties, classN?: string}> =(props) => {
    return <h1 className={"logo " + props.classN} style={props.style}>
        PHIMGAYGO
    </h1>
}

export default Logo