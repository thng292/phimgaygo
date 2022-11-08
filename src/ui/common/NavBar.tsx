import React, { FC } from "react";
import './css/typography.css'

const NavBar: FC<{
    actions: {
        title: JSX.Element,
        onClick: ()=>void,
    }[]
}> = (props) => {
    return <nav style={{
        position: 'fixed',
        height: '46px',
        display: 'flex',
        justifyContent: 'center',
    }}>
        {props.actions.map((value: {title: JSX.Element,onClick: ()=>void}) => {
            return <li
                className="p10 desc"
                style={{
                    listStyle: 'none',
                    cursor: 'pointer'
                }}
                onClick={value.onClick}
            >
                {value.title}
            </li>
        })}
    </nav>
}

export default NavBar