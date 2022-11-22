import React, { FC } from 'react'

const Logo: FC<{ style?: React.CSSProperties}> =(props) => {
    return <h1 className="logo" style={props.style}>
        PHIMGAYGO
    </h1>
}

export default Logo